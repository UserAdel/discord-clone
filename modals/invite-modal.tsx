"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useModal } from "@/hooks/use-modal-store";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export function InviteModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;
  const [copied, setCopied] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Friends{" "}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2 ">
            <Input
              disabled
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black !bg-zinc-500/50"
              value={inviteUrl}
            />
            <Button onClick={onCopy} size="icon" disabled={isloading}>
              {copied ? (
                <Check className="size-4 " />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            disabled={isloading}
            onClick={onNew}
          >
            Generate new link
            <RefreshCw className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
