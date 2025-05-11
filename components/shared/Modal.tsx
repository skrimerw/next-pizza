"use client";

import { cn } from "@/lib/utils";
import { useClickOutside } from "@/shared/hooks";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
    onClose?: () => void;
    isOpen?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function Modal({ onClose, isOpen, className, children }: Props) {
    const [showModal, setShowModal] = useState(isOpen || false);
    const modalRef = useRef(null);
    useClickOutside(modalRef, handleCloseModal);

    function handleCloseModal() {
        if (onClose) {
            onClose();
        }
        setShowModal(false);
    }

    useEffect(() => {
      if (showModal) {
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'auto'
      }
    }, [showModal])

    return (
        <div
            className={cn(
                "fixed top-0 z-50 bg-black/70 w-full h-svh visible opacity-100 flex justify-center transition-all duration-300 items-center",
                showModal ? "visible opacity-100" : "invisible opacity-0"
            )}
        >
            <div
                ref={modalRef}
                className={cn(
                    "relative max-w-screen-lg w-full bg-white rounded-md p-6",
                    className
                )}
            >
                <button
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={handleCloseModal}
                >
                    <X className="w-4 h-4" />
                </button>
                {children}
            </div>
        </div>
    );
}
