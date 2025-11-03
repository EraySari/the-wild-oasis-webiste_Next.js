"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterCabin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = searchParams.get("capacity");

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", `${filter}`);
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex border border-primary-800">
      <button
        className={`px-10 py-3 hover:bg-primary-800 ${
          filter === "all" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All
      </button>
      <button
        className={`px-10 py-3 hover:bg-primary-800 ${
          filter === "small" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        Small
      </button>
      <button
        className={`px-10 py-3 hover:bg-primary-800 ${
          filter === "medium" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        Medium
      </button>
      <button
        className={`px-10 py-3 hover:bg-primary-800 ${
          filter === "large" ? "bg-primary-700" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        Large
      </button>
    </div>
  );
}
