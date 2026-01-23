"use client";

import { useComposeStore } from "@/store/composeStore";
import { useEmailStore } from "@/store/emailStore";
import ComposeHeader from "./ComposeHeader";
import ComposeRecipients from "./ComposeRecipients";
import ComposeSubject from "./ComposeSubject";
import ComposeEditor from "./ComposeEditor";
import ComposeActions from "./ComposeActions";

function stripHtml(html: string): string {
  if (typeof document !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return html.replace(/<[^>]*>/g, "");
}

export default function ComposeModal() {
  const {
    isOpen,
    modalState,
    mode,
    draft,
    setModalState,
    closeCompose,
    updateDraft,
    resetDraft,
  } = useComposeStore();

  const { addEmail } = useEmailStore();

  if (!isOpen) return null;

  const getTitle = () => {
    if (draft.to.length > 0) {
      return draft.to.join(", ");
    }
    switch (mode) {
      case "reply":
        return "Reply";
      case "replyAll":
        return "Reply All";
      case "forward":
        return "Forward";
      default:
        return "New Message";
    }
  };

  const handleMinimize = () => {
    setModalState(modalState === "minimized" ? "normal" : "minimized");
  };

  const handleMaximize = () => {
    setModalState(modalState === "maximized" ? "normal" : "maximized");
  };

  const handleClose = () => {
    const hasContent =
      draft.to.length > 0 ||
      draft.cc.length > 0 ||
      draft.bcc.length > 0 ||
      draft.subject ||
      (draft.body && stripHtml(draft.body).trim());

    if (hasContent) {
      const confirmed = window.confirm("Discard this message?");
      if (!confirmed) return;
    }

    closeCompose();
  };

  const handleSend = () => {
    if (draft.to.length === 0) {
      alert("Please specify at least one recipient.");
      return;
    }

    const newEmail = {
      id: `sent-${Date.now()}`,
      from: { name: "Me", email: "me@example.com" },
      to: draft.to.join(", "),
      subject: draft.subject || "(no subject)",
      preview: stripHtml(draft.body).substring(0, 100),
      body: draft.body,
      date: new Date(),
      read: true,
      starred: false,
      important: false,
      labels: ["sent"],
      hasAttachment: false,
    };

    addEmail(newEmail);
    resetDraft();
    closeCompose();
  };

  const handleDiscard = () => {
    const confirmed = window.confirm("Discard this message?");
    if (confirmed) {
      resetDraft();
      closeCompose();
    }
  };

  const getModalClasses = () => {
    const base =
      "flex flex-col bg-white dark:bg-gray-900 rounded-t-lg shadow-2xl border border-gray-200 dark:border-gray-700";

    switch (modalState) {
      case "minimized":
        return `${base} fixed bottom-0 right-6 w-72 z-50`;
      case "maximized":
        return `${base} fixed inset-4 z-50 rounded-lg`;
      default:
        return `${base} fixed bottom-0 right-6 w-[500px] h-[500px] z-50`;
    }
  };

  return (
    <>
      {modalState === "maximized" && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={handleClose} />
      )}
      <div className={getModalClasses()}>
        <ComposeHeader
          title={getTitle()}
          modalState={modalState}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
        />

        {modalState !== "minimized" && (
          <>
            <ComposeRecipients
              to={draft.to}
              cc={draft.cc}
              bcc={draft.bcc}
              onChange={(field, values) => updateDraft({ [field]: values })}
            />

            <ComposeSubject
              value={draft.subject}
              onChange={(subject) => updateDraft({ subject })}
            />

            <ComposeEditor
              initialContent={draft.body}
              onChange={(body) => updateDraft({ body })}
              placeholder="Compose email"
            />

            <ComposeActions onSend={handleSend} onDiscard={handleDiscard} />
          </>
        )}
      </div>
    </>
  );
}
