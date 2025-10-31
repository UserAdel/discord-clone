import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}
export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const { serverId, channelId } = await params;

  const profile = await currentProfile();
  if (!profile) {
    redirect("/sign-in");
  }
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">Future messages </div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messges"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
}
