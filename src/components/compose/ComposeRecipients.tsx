"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface ComposeRecipientsProps {
  to: string[];
  cc: string[];
  bcc: string[];
  onChange: (field: "to" | "cc" | "bcc", values: string[]) => void;
}

function EmailChip({
  email,
  onRemove,
}: {
  email: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
      {email}
      <button
        onClick={onRemove}
        className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function RecipientInput({
  label,
  emails,
  onChange,
  autoFocus,
}: {
  label: string;
  emails: string[];
  onChange: (emails: string[]) => void;
  autoFocus?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addEmail = (value: string) => {
    const email = value.trim();
    if (email && isValidEmail(email) && !emails.includes(email)) {
      onChange([...emails, email]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      e.preventDefault();
      addEmail(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && emails.length > 0) {
      onChange(emails.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addEmail(inputValue);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const pastedEmails = pastedText.split(/[,;\s]+/).filter(isValidEmail);
    if (pastedEmails.length > 0) {
      e.preventDefault();
      const newEmails = [...new Set([...emails, ...pastedEmails])];
      onChange(newEmails);
    }
  };

  return (
    <div className="flex items-start gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-sm text-gray-500 dark:text-gray-400 py-1 w-10">
        {label}
      </span>
      <div className="flex-1 flex flex-wrap items-center gap-1">
        {emails.map((email, index) => (
          <EmailChip
            key={index}
            email={email}
            onRemove={() => onChange(emails.filter((_, i) => i !== index))}
          />
        ))}
        <input
          type="email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          autoFocus={autoFocus}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 py-1"
          placeholder={emails.length === 0 ? "Enter email addresses" : ""}
        />
      </div>
    </div>
  );
}

export default function ComposeRecipients({
  to,
  cc,
  bcc,
  onChange,
}: ComposeRecipientsProps) {
  const [showCc, setShowCc] = useState(cc.length > 0);
  const [showBcc, setShowBcc] = useState(bcc.length > 0);

  return (
    <div>
      <div className="flex items-center">
        <div className="flex-1">
          <RecipientInput
            label="To"
            emails={to}
            onChange={(values) => onChange("to", values)}
            autoFocus
          />
        </div>
        {(!showCc || !showBcc) && (
          <div className="flex items-center gap-2 px-2 text-sm text-gray-500 dark:text-gray-400">
            {!showCc && (
              <button
                onClick={() => setShowCc(true)}
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Cc
              </button>
            )}
            {!showBcc && (
              <button
                onClick={() => setShowBcc(true)}
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Bcc
              </button>
            )}
          </div>
        )}
      </div>
      {showCc && (
        <RecipientInput
          label="Cc"
          emails={cc}
          onChange={(values) => onChange("cc", values)}
        />
      )}
      {showBcc && (
        <RecipientInput
          label="Bcc"
          emails={bcc}
          onChange={(values) => onChange("bcc", values)}
        />
      )}
    </div>
  );
}
