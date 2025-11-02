import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";
interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMeesage = async (pageParam: unknown = undefined) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam as string | undefined,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );
    const res = await axios.get(url);
    return res.data;
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey, paramValue],
      queryFn: ({ pageParam }) => fetchMeesage(pageParam),
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam: undefined,
      refetchInterval: isConnected ? false : 1000,
    });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
