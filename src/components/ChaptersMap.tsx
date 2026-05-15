"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const USMap = dynamic(() => import("./USMap"), { ssr: false });

interface ChaptersMapProps {
  selectedState?: string;
  className?: string;
}

export default function ChaptersMap({ selectedState, className = '' }: ChaptersMapProps) {
  const router = useRouter();

  const handleStateClick = (stateCode: string) => {
    router.push(`/chapters/${stateCode}`);
  };

  return (
    <USMap
      selectedState={selectedState}
      onStateClick={handleStateClick}
      interactive={true}
    />
  );
}
