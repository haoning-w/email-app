"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function DraftsPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Drafts");
  }, [setFilter]);

  return <EmailList />;
}
