import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitalModal } from "@/modals/initial-modal";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitalModal />;
}
