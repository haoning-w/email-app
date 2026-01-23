"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function StarredPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Starred");
  }, [setFilter]);

  return <EmailList />;
}
