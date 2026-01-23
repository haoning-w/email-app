"use client";

interface ComposeSubjectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ComposeSubject({
  value,
  onChange,
}: ComposeSubjectProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Subject"
        className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
      />
    </div>
  );
}
