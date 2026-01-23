"use client";

import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { ModalState } from "@/store/composeStore";

interface ComposeHeaderProps {
  title: string;
  modalState: ModalState;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export default function ComposeHeader({
  title,
  modalState,
  onMinimize,
  onMaximize,
  onClose,
}: ComposeHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-700 rounded-t-lg cursor-move">
      <span className="text-sm font-medium text-white truncate">{title}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
          title="Minimize"
        >
          <Minus className="w-4 h-4 text-gray-300" />
        </button>
        <button
          onClick={onMaximize}
          className="p-1 hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
          title={modalState === "maximized" ? "Restore" : "Maximize"}
        >
          {modalState === "maximized" ? (
            <Minimize2 className="w-4 h-4 text-gray-300" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-300" />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 dark:hover:bg-gray-600 rounded"
          title="Close"
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  );
}
