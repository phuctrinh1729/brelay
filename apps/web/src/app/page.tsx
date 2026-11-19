"use client";

import { useEffect, useState } from "react";
import { API_PREFIX, type HealthResponse } from "@app/shared";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function Home() {
  const [status, setStatus] = useState("Đang kiểm tra API...");

  useEffect(() => {
    fetch(`${BASE}${API_PREFIX}/health`)
      .then((res) => res.json() as Promise<HealthResponse>)
      .then((data) => setStatus(`API: ${data.status}`))
      .catch(() => setStatus("Không kết nối được API"));
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Web</h1>
      <p className="mt-4">{status}</p>
    </main>
  );
}
