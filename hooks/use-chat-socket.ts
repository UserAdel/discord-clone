import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@/lib/generated/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  paramValue: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  paramValue,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            item: page.item.map((msg: MessageWithMemberWithProfile) => {
              if (msg.id === message.id) {
                return message;
              }
              return msg;
            }),
          };
        });
        return { ...oldData, pages: newData };
      });
    });
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey, paramValue], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                item: [message],
              },
            ],
          };
        }
        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          item: [message, ...newData[0].item],
        };
        return { ...oldData, pages: newData };
      });
    });
    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [addKey, updateKey, queryKey, paramValue, queryClient, socket]);
};
