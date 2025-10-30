import { Hash } from "lucide-react";
interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imgUrl: string;
}
export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between py-2 px-3 lg:px-6">
      Chat
    </div>
  );
};
