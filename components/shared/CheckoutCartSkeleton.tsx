import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CheckoutCartSkeleton() {
    return (
        <div className="flex flex-col gap-8 pt-8">
            {Array.from({ length: 3 }, (_, i) => {
                return (
                    <div key={i} className="flex gap-2 flex-col min-[540px]:flex-row">
                        <div className="flex items-center gap-2 w-full mb-5 min-[540px]:mb-0">
                            <Skeleton className="h-[65px] w-[65px] rounded-full flex-none" />
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-1/3" />
                            </div>
                        </div>
                        <div className="flex gap-1 flex-row-reverse justify-between min-[540px]:justify-end min-[540px]:flex-row items-center m-0 min-[540px]:ml-auto">
                            <Skeleton className="h-6 w-16 min-[540px]:mr-6" />
                            <Skeleton className="h-8 w-8 mr-auto" />
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-6 w-6 hidden min-[540px]:block" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
