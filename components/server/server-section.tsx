"use client";

import { ChannelType, MemberRole } from "@/lib/generated/prisma";
import { ServerWithMembersWithProfiles } from "@/types";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface serverSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channel" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}
export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: serverSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2  ">
      {" "}
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channel" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300"
          >
            <Plus className="size-4 " />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300"
          >
            <Settings className="size-4 " />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
