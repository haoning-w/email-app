"use client";

import { Send, Paperclip, Trash2 } from "lucide-react";

interface ComposeActionsProps {
  onSend: () => void;
  onDiscard: () => void;
  isSending?: boolean;
}

export default function ComposeActions({
  onSend,
  onDiscard,
  isSending,
}: ComposeActionsProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-2">
        <button
          onClick={onSend}
          disabled={isSending}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          Send
        </button>

        <button
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          title="Attach files"
        >
          <Paperclip className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onDiscard}
        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        title="Discard draft"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
