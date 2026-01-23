"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function SentPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Sent");
  }, [setFilter]);

  return <EmailList />;
}
