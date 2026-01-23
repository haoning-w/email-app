import { notFound } from "next/navigation";
import Link from "next/link";
import { mockEmails } from "@/data/emails";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  ArrowLeft,
  Star,
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Paperclip,
  Printer,
  ExternalLink,
  Trash2,
  Archive,
} from "lucide-react";

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function ThreadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const backUrl = from || "/inbox";
  const email = mockEmails.find((e) => e.id === id);

  if (!email) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Thread toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <Link
              href={backUrl}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="Archive"
            >
              <Archive className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="Print"
            >
              <Printer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="Open in new window"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="flex-1" />

            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              title="More"
            >
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Thread content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Subject line */}
            <div className="flex items-start gap-4 mb-6">
              <h1 className="text-2xl font-normal text-gray-900 dark:text-white flex-1">
                {email.subject}
              </h1>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Star
                  className={`w-6 h-6 ${
                    email.starred
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Labels */}
            {email.labels.length > 0 && (
              <div className="flex gap-2 mb-6">
                {email.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Email card */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              {/* Email header */}
              <div className="flex items-start gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {email.from.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {email.from.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      &lt;{email.from.email}&gt;
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    to {email.to}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFullDate(email.date)}
                  </span>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Email body */}
              <div className="p-6">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {email.body}
                </p>

                {/* Attachment indicator */}
                {email.hasAttachment && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">1 Attachment</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          PDF
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        attachment.pdf
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reply actions */}
              <div className="flex items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <ReplyAll className="w-4 h-4" />
                  Reply all
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Forward className="w-4 h-4" />
                  Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
