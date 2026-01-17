"use client";

import { folders, labels } from "@/data/emails";
import { useFilter } from "@/context/FilterContext";
import {
  Inbox,
  Star,
  Clock,
  Tag,
  Send,
  FileText,
  AlertTriangle,
  Trash2,
  Plus,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  inbox: Inbox,
  star: Star,
  clock: Clock,
  tag: Tag,
  send: Send,
  file: FileText,
  alert: AlertTriangle,
  trash: Trash2,
};

export default function Sidebar() {
  const { filter, setFilter } = useFilter();
  const isActiveFolder = (name: string) => filter.type === "folder" && filter.value === name;
  const isActiveLabel = (name: string) => filter.type === "label" && filter.value === name;

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 h-full flex flex-col">
      {/* Compose Button */}
      <div className="p-4">
        <button className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <Plus className="w-6 h-6" />
          <span className="font-medium">Compose</span>
        </button>
      </div>

      {/* Folders */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {folders.map((folder) => (
            <li key={folder.name}>
              <button
                onClick={() => setFilter("folder", folder.name)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-r-full text-sm transition-colors ${
                  isActiveFolder(folder.name)
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {(() => {
                  const Icon = iconMap[folder.icon];
                  return Icon ? (
                    <Icon className={`w-5 h-5 ${isActiveFolder(folder.name) ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                  ) : null;
                })()}
                <span className="flex-1 text-left">{folder.name}</span>
                {folder.count > 0 && (
                  <span className={`text-xs ${isActiveFolder(folder.name) ? "font-bold" : "font-medium"}`}>
                    {folder.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Labels Section */}
        <div className="mt-6 px-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Labels
          </h3>
          <ul className="space-y-1">
            {labels.map((label) => (
              <li key={label.name}>
                <button
                  onClick={() => setFilter("label", label.name)}
                  className={`w-full flex items-center gap-3 px-4 py-1.5 rounded-r-full text-sm transition-colors ${
                    isActiveLabel(label.name)
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  <span className="capitalize">{label.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Storage */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          2.4 GB of 15 GB used
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "16%" }} />
        </div>
      </div>
    </aside>
  );
}
