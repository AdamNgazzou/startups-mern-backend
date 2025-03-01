"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsProvider({ children }: { children: (params: { query?: string; page?: string }) => React.ReactNode }) {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || "1";
    console.log(page);     
    }
