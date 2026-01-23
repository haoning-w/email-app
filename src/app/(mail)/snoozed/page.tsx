"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function SnoozedPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Snoozed");
  }, [setFilter]);

  return <EmailList />;
}
