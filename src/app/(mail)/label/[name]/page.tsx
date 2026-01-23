"use client";

import { useEffect, use } from "react";
import { useFilter } from "@/context/FilterContext";
import EmailList from "@/components/ThreadList";

export default function LabelPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const { setFilter } = useFilter();
  const decodedName = decodeURIComponent(name);

  useEffect(() => {
    setFilter("label", decodedName);
  }, [setFilter, decodedName]);

  return <EmailList />;
}
