"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Email } from "@/data/emails";
import { useFilter } from "@/context/FilterContext";
import { useEmailStore } from "@/store/emailStore";
import {
  Star,
  Tag,
  Paperclip,
  ChevronDown,
  RefreshCw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Users,
} from "lucide-react";

function formatDate(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isThisYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (isThisYear) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function EmailRow({
  email,
  isSelected,
  onSelect,
  onToggleStar,
  onClick,
}: {
  email: Email;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleStar: (id: string) => void;
  onClick: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/30"
          : isHovered
            ? "bg-gray-50 dark:bg-gray-800/50"
            : ""
      } ${!email.read ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-900/50"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(email.id)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(email.id)}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
      />

      {/* Star */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStar(email.id);
        }}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
      >
        <Star
          className={`w-5 h-5 ${email.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
        />
      </button>

      {/* Important marker */}
      <button
        onClick={(e) => e.stopPropagation()}
        className={`p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full ${email.important ? "text-yellow-600" : "text-gray-400"}`}
      >
        <Tag className={`w-5 h-5 ${email.important ? "fill-current" : ""}`} />
      </button>

      {/* Sender */}
      <div
        className={`w-48 truncate ${!email.read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
      >
        {email.from.name}
      </div>

      {/* Subject and Preview */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span
          className={`truncate ${!email.read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-900 dark:text-gray-200"}`}
        >
          {email.subject}
        </span>
        <span className="text-gray-500 dark:text-gray-500 truncate hidden md:inline">
          — {email.preview}
        </span>
      </div>

      {/* Attachment indicator */}
      {email.hasAttachment && (
        <Paperclip className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}

      {/* Date */}
      <div
        className={`text-sm flex-shrink-0 w-20 text-right ${!email.read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
      >
        {formatDate(email.date)}
      </div>
    </div>
  );
}

export default function EmailList() {
  const router = useRouter();
  const { filter } = useFilter();
  const {
    emails,
    selectedEmails,
    toggleSelectEmail,
    selectAllEmails,
    clearSelection,
    toggleStar,
  } = useEmailStore();

  const filteredEmails = useMemo(() => {
    if (filter.type === "folder") {
      switch (filter.value) {
        case "Inbox":
          return emails;
        case "Starred":
          return emails.filter((e) => e.starred);
        case "Important":
          return emails.filter((e) => e.important);
        case "Snoozed":
        case "Sent":
        case "Drafts":
        case "Spam":
        case "Trash":
          return [];
        default:
          return emails;
      }
    } else if (filter.type === "label") {
      return emails.filter((e) => e.labels.includes(filter.value));
    }
    return emails;
  }, [emails, filter]);

  const toggleSelectAll = () => {
    if (selectedEmails.size === filteredEmails.length) {
      clearSelection();
    } else {
      selectAllEmails(filteredEmails.map((e) => e.id));
    }
  };

  const unreadCount = filteredEmails.filter((e) => !e.read).length;

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        {/* Select all checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={
              selectedEmails.size === filteredEmails.length &&
              filteredEmails.length > 0
            }
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
          />
          <button className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Refresh button */}
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* More options */}
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          title="More"
        >
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="flex-1" />

        {/* Pagination */}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredEmails.length > 0 ? `1-${filteredEmails.length}` : "0"} of{" "}
          {filteredEmails.length}
        </span>
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full disabled:opacity-50"
          disabled
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full disabled:opacity-50"
          disabled
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium">
          <Inbox className="w-5 h-5" />
          Primary
          {unreadCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </button>
        <button className="flex items-center gap-2 px-6 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
          <Users className="w-5 h-5" />
          Social
        </button>
        <button className="flex items-center gap-2 px-6 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
          <Tag className="w-5 h-5" />
          Promotions
        </button>
        <button className="flex items-center gap-2 px-6 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
          <RefreshCw className="w-5 h-5" />
          Updates
        </button>
      </div>

      {/* Email list */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <Inbox className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">No threads found</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailRow
              key={email.id}
              email={email}
              isSelected={selectedEmails.has(email.id)}
              onSelect={toggleSelectEmail}
              onToggleStar={toggleStar}
              onClick={(id) => router.push(`/thread/${id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
