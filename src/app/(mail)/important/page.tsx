"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function ImportantPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Important");
  }, [setFilter]);

  return <EmailList />;
}
