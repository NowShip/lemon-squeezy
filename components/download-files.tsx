"use client";

import React, { useState } from "react";

import { getFiles } from "@/lib/action";

type Props = {
  variantId: string;
};

export default function DownloadFiles({ variantId }: Props) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const files = await getFiles(variantId);

    files.data.data.forEach((file) => {
      window.open(file.attributes.download_url, "_blank");
    });

    setLoading(false);
  };

  return (
    <button className="bg-green-400 p-4" onClick={onClick}>
      {loading ? "Loading..." : "Download Files"}
    </button>
  );
}
