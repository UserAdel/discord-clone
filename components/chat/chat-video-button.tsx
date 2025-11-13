"use client";
import { Video, VideoOff } from "lucide-react";
import qs from "query-string";
import { ActionTooltip } from "../action-tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ChatVideoButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const seachParams = useSearchParams();
  const isVideo = seachParams?.get("video");
  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? "End video call" : "start video";

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <ActionTooltip side="bottom" label={toolTipLabel}>
      <button className="hover:opacity-75 transition mr-4">
        <Icon
          className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
          onClick={onClick}
        />
      </button>
    </ActionTooltip>
  );
};
