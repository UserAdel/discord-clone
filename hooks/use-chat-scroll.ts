import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [HasInitialized, setHasInitailed] = useState(false);
  useEffect(() => {
    const topDiv = chatRef?.current;
    const handelScroll = () => {
      const scrollTop = topDiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handelScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handelScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;
    const shouldAutoScroll = () => {
      if (!HasInitialized && bottomDiv) {
        console.log("[Scroll] First time - auto scrolling");
        setHasInitailed(true);
        return true;
      }
      if (!topDiv) {
        console.log("[Scroll] No topDiv");
        return false;
      }
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      console.log("[Scroll] Distance from bottom:", distanceFromBottom);
      return distanceFromBottom <= 100;
    };

    console.log("[Scroll] Effect triggered, count:", count);
    const shouldScroll = shouldAutoScroll();
    console.log("[Scroll] Should auto scroll:", shouldScroll);

    if (shouldScroll) {
      setTimeout(() => {
        console.log("[Scroll] Scrolling to bottom");
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, count, HasInitialized]);
};
