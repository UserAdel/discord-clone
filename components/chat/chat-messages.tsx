"use client";

import { Member, Message, Profile } from "@/lib/generated/prisma";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
type MessageWithMemberWithProfile = Message & {
  Member: Member & {
    profile: Profile;
  };
};
export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });
  if (status === "pending")
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {" "}
          Loadding messages{" "}
        </p>
      </div>
    );
  if (status === "error")
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 " />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          something went wrong!
        </p>
      </div>
    );
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome name={name} type={type} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group?.item?.map((message: MessageWithMemberWithProfile) => (
                <div key={message.id}>{message.content}</div>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
