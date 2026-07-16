import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import crypto from "node:crypto";
import { db } from "../db.server";

// Secure password hashing helpers using Node's native crypto module
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return verifyHash === hash;
}

// Server function for registering a new user
export const registerUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      phone: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { name, email, password, phone } = data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    // Hash password and save user
    const passwordHash = hashPassword(password);
    const user = await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        phone,
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone ?? undefined,
      },
    };
  });

// Server function for logging in a user
export const loginUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    }),
  )
  .handler(async ({ data }) => {
    const { email, password } = data;

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Verify password
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone ?? undefined,
      },
    };
  });

// Server function for fetching enrollments of a user
export const fetchUserEnrollments = createServerFn({ method: "GET" })
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const enrollments = await db.enrollment.findMany({
      where: { userId: data.userId },
      select: { courseId: true },
    });

    return {
      courseIds: enrollments.map((e) => e.courseId),
    };
  });

// Server function for enrolling in a course with details confirmation
export const enrollInCourse = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      courseId: z.string(),
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { userId, courseId, name, email, phone } = data;

    // Find user to verify they exist
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Update user record if name, email, or phone is updated/submitted
    const updateData: Record<string, string> = {};
    if (name && name !== user.name) updateData.name = name;
    if (email && email !== user.email) updateData.email = email;
    if (phone && phone !== user.phone) updateData.phone = phone;

    if (Object.keys(updateData).length > 0) {
      await db.user.update({
        where: { id: userId },
        data: updateData,
      });
    }

    // Create enrollment (using upsert/create)
    const enrollment = await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      update: {},
      create: {
        userId,
        courseId,
      },
    });

    // Fetch updated user to return back to frontend state
    const updatedUser = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true },
    });

    return {
      success: true,
      enrollment,
      user: updatedUser
        ? {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone ?? undefined,
          }
        : undefined,
    };
  });

// Server function for unenrolling from a course
export const unenrollFromCourse = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      courseId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { userId, courseId } = data;

    await db.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return { success: true };
  });

// Server function for admin dashboard to retrieve all signups/enrollments
export const fetchAdminEnrollments = createServerFn({ method: "GET" }).handler(async () => {
  const enrollments = await db.enrollment.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    enrollments: enrollments.map((e) => ({
      id: e.id,
      courseId: e.courseId,
      createdAt: e.createdAt.toISOString(),
      studentName: e.user.name,
      studentEmail: e.user.email,
      studentPhone: e.user.phone ?? "N/A",
    })),
  };
});

// Server function to fetch course progress
export const fetchCourseProgress = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      userId: z.string(),
      courseId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const { userId, courseId } = data;
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    return {
      completedWeeks: progress ? progress.completedWeeks : [],
    };
  });

// Server function to update/toggle course progress
export const updateCourseProgress = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userId: z.string(),
      courseId: z.string(),
      completedWeeks: z.array(z.string()),
    }),
  )
  .handler(async ({ data }) => {
    const { userId, courseId, completedWeeks } = data;
    const progress = await db.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      update: {
        completedWeeks,
      },
      create: {
        userId,
        courseId,
        completedWeeks,
      },
    });
    return { success: true, progress };
  });
