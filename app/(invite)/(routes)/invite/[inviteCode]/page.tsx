import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

export default async function InvitePage({ params }: InviteCodePageProps) {
  const { inviteCode } = await params;
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  if (!inviteCode) {
    return redirect("/");
  }
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    redirect(`/servers/${server.id}`);
  }
  return null;
}
