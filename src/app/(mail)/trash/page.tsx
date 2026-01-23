"use client";

import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function TrashPage() {
  const { setFilter } = useFilter();

  useEffect(() => {
    setFilter("folder", "Trash");
  }, [setFilter]);

  return <EmailList />;
}
