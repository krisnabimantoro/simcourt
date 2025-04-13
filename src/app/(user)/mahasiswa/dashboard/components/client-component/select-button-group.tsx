// app/components/PilihButton.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelectButtonGroup({ mahasiswa_id, group_id, token }: { mahasiswa_id: number; group_id: number; token: any }) {
  const [selected, setSelected] = useState(false);

  const handleClick = async () => {
    const postData = { mahasiswa_id, group_id };
    console.log("Post data:", postData);
    try {
      const res = await fetch("http://127.0.0.1:8020/api/v1/student-groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      const result = await res.json();
      console.log("Post result:", result);
      setSelected(true);
    } catch (err) {
      console.error("Error posting student data:", err);
    }
  };

  return (
    <Badge className="hover:cursor-pointer" onClick={handleClick} variant={selected ? "secondary" : "default"}>
      {selected ? "Dipilih" : "Pilih"}
    </Badge>
  );
}
