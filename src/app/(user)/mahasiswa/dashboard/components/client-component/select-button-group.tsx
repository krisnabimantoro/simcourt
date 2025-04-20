// app/components/PilihButton.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelectButtonGroup({
  mahasiswa_id,
  group_id,
  token,
  listGroups,
  duplicated,
}: {
  mahasiswa_id: number;
  group_id: number;
  token: any;
  listGroups: any;
  duplicated: any;
}) {
  const [selected, setSelected] = useState(false);
  const [duplicatedState, setDuplicatedState] = useState(duplicated);
  const router = useRouter();

  const handleClick = async () => {
    const postData = { mahasiswa_id, group_id };
    console.log("Post data:", postData);
    const NEXT_PUBLIC_URL_FETCH = process.env.NEXT_PUBLIC_URL_FETCH;
    try {
      if (duplicatedState) {
        const res = await fetch(`${NEXT_PUBLIC_URL_FETCH}/api/v1/student-groups/${mahasiswa_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await res.json();
        setSelected(false);
        setDuplicatedState(false);
        console.log("Post result:", result);
        router.refresh();
      } else {
        const res = await fetch(`${url}/api/v1/student-groups`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: "include",
        });

        const result = await res.json();
        setSelected(true);
        setDuplicatedState(true);
        console.log("Post result:", result);
        router.refresh();
      }
    } catch (err) {
      console.error(`${duplicated ? "Delete" : "Post"} error:`, err);
    }
  };

  console.log("listGroups", listGroups);
  console.log("duplicated", duplicated);
  return (
    <Badge className="hover:cursor-pointer" onClick={handleClick} variant={duplicatedState || selected ? "destructive" : "default"}>
      {duplicatedState || selected ? "Hapus" : "Pilih"}
    </Badge>
  );
}
