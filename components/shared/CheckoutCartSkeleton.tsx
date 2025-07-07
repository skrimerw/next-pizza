import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CheckoutCartSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 3 }, (_, i) => {
        return (
          <div key={i} className="flex gap-2">
            <Skeleton className="h-[65px] w-[65px] rounded-full flex-none" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="flex gap-1 items-center">
              <Skeleton className="h-6 w-16 mr-6" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
