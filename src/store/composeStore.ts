import { create } from "zustand";
import { Email } from "@/data/emails";

export type ComposeMode = "compose" | "reply" | "replyAll" | "forward";
export type ModalState = "normal" | "minimized" | "maximized";

interface DraftEmail {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
}

interface ComposeState {
  isOpen: boolean;
  modalState: ModalState;
  mode: ComposeMode;
  originalEmail: Email | null;
  draft: DraftEmail;

  openCompose: () => void;
  openReply: (email: Email, mode: "reply" | "replyAll" | "forward") => void;
  closeCompose: () => void;
  setModalState: (state: ModalState) => void;
  updateDraft: (updates: Partial<DraftEmail>) => void;
  resetDraft: () => void;
}

const initialDraft: DraftEmail = {
  to: [],
  cc: [],
  bcc: [],
  subject: "",
  body: "",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function buildQuotedMessage(email: Email): string {
  const date = formatDate(email.date);
  return `<div class="gmail_quote"><div>On ${date}, ${email.from.name} &lt;${email.from.email}&gt; wrote:</div><blockquote style="margin:0 0 0 .8ex;border-left:1px solid #ccc;padding-left:1ex">${email.body}</blockquote></div>`;
}

function buildDraftFromReply(
  email: Email,
  mode: "reply" | "replyAll" | "forward"
): DraftEmail {
  const quotedBody = buildQuotedMessage(email);

  switch (mode) {
    case "reply":
      return {
        to: [email.from.email],
        cc: [],
        bcc: [],
        subject: email.subject.startsWith("Re:")
          ? email.subject
          : `Re: ${email.subject}`,
        body: `<br/><br/>${quotedBody}`,
      };
    case "replyAll": {
      const allRecipients = [email.from.email];
      if (email.to && email.to !== "me@example.com") {
        allRecipients.push(email.to);
      }
      const uniqueRecipients = [...new Set(allRecipients)].filter(
        (e) => e !== "me@example.com"
      );
      return {
        to: uniqueRecipients,
        cc: [],
        bcc: [],
        subject: email.subject.startsWith("Re:")
          ? email.subject
          : `Re: ${email.subject}`,
        body: `<br/><br/>${quotedBody}`,
      };
    }
    case "forward":
      return {
        to: [],
        cc: [],
        bcc: [],
        subject: email.subject.startsWith("Fwd:")
          ? email.subject
          : `Fwd: ${email.subject}`,
        body: `<br/><br/>---------- Forwarded message ---------<br/>From: ${email.from.name} &lt;${email.from.email}&gt;<br/>Date: ${formatDate(email.date)}<br/>Subject: ${email.subject}<br/>To: ${email.to}<br/><br/>${email.body}`,
      };
    default:
      return { ...initialDraft };
  }
}

export const useComposeStore = create<ComposeState>((set) => ({
  isOpen: false,
  modalState: "normal",
  mode: "compose",
  originalEmail: null,
  draft: { ...initialDraft },

  openCompose: () =>
    set({
      isOpen: true,
      modalState: "normal",
      mode: "compose",
      originalEmail: null,
      draft: { ...initialDraft },
    }),

  openReply: (email, mode) => {
    const draft = buildDraftFromReply(email, mode);
    set({
      isOpen: true,
      modalState: "normal",
      mode,
      originalEmail: email,
      draft,
    });
  },

  closeCompose: () =>
    set({
      isOpen: false,
      modalState: "normal",
    }),

  setModalState: (modalState) => set({ modalState }),

  updateDraft: (updates) =>
    set((state) => ({
      draft: { ...state.draft, ...updates },
    })),

  resetDraft: () => set({ draft: { ...initialDraft } }),
}));
