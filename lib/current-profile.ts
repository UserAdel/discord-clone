import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { db } from "./db";

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  return profile;
};
