"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function SpamPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Spam");
  }, [setFilter]);

  return <EmailList />;
}
