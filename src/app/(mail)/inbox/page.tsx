"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function InboxPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Inbox");
  }, [setFilter]);

  return <EmailList />;
}
