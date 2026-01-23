"use client";

import { Reply, ReplyAll, Forward } from "lucide-react";
import { useComposeStore } from "@/store/composeStore";
import { Email } from "@/data/emails";

interface ReplyActionsProps {
  email: Email;
}

export default function ReplyActions({ email }: ReplyActionsProps) {
  const { openReply } = useComposeStore();

  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => openReply(email, "reply")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        <Reply className="w-4 h-4" />
        Reply
      </button>
      <button
        onClick={() => openReply(email, "replyAll")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        <ReplyAll className="w-4 h-4" />
        Reply all
      </button>
      <button
        onClick={() => openReply(email, "forward")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      >
        <Forward className="w-4 h-4" />
        Forward
      </button>
    </div>
  );
}
