import { create } from "zustand";
import { Email, mockEmails } from "@/data/emails";

interface EmailState {
  emails: Email[];
  selectedEmails: Set<string>;

  // Actions
  toggleStar: (id: string) => void;
  toggleRead: (id: string) => void;
  toggleImportant: (id: string) => void;
  markAsRead: (id: string) => void;
  selectEmail: (id: string) => void;
  deselectEmail: (id: string) => void;
  toggleSelectEmail: (id: string) => void;
  selectAllEmails: (ids: string[]) => void;
  clearSelection: () => void;
  getEmailById: (id: string) => Email | undefined;
}

export const useEmailStore = create<EmailState>((set, get) => ({
  emails: mockEmails,
  selectedEmails: new Set(),

  toggleStar: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      ),
    })),

  toggleRead: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      ),
    })),

  toggleImportant: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, important: !email.important } : email
      ),
    })),

  markAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      ),
    })),

  selectEmail: (id) =>
    set((state) => {
      const next = new Set(state.selectedEmails);
      next.add(id);
      return { selectedEmails: next };
    }),

  deselectEmail: (id) =>
    set((state) => {
      const next = new Set(state.selectedEmails);
      next.delete(id);
      return { selectedEmails: next };
    }),

  toggleSelectEmail: (id) =>
    set((state) => {
      const next = new Set(state.selectedEmails);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { selectedEmails: next };
    }),

  selectAllEmails: (ids) =>
    set(() => ({
      selectedEmails: new Set(ids),
    })),

  clearSelection: () =>
    set(() => ({
      selectedEmails: new Set(),
    })),

  getEmailById: (id) => {
    return get().emails.find((email) => email.id === id);
  },
}));
