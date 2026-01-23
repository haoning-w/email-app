export const FOLDER_ROUTES: Record<string, string> = {
  Inbox: "/inbox",
  Starred: "/starred",
  Snoozed: "/snoozed",
  Important: "/important",
  Sent: "/sent",
  Drafts: "/drafts",
  Spam: "/spam",
  Trash: "/trash",
};

export function getFolderRoute(folderName: string): string {
  return FOLDER_ROUTES[folderName] || "/inbox";
}

export function getLabelRoute(labelName: string): string {
  return `/label/${encodeURIComponent(labelName)}`;
}
