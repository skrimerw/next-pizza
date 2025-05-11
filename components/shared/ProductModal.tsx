"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export default function ProductModal({ className, children }: Props) {
    const [showModal, setShowModal] = useState(true);

    const router = useRouter();

    return (
        <Modal
            className={cn(className)}
            onClose={() => router.back()}
            isOpen={showModal}
        >
            {children}
        </Modal>
    );
}
