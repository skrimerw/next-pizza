"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface Props {
    onClose?: () => void;
    isOpen: boolean;
    setShowModal: (value: React.SetStateAction<boolean>) => void;
    className?: string;
    closeButtonClass?: string;
    children?: React.ReactNode;
}

export default function Modal({
    onClose,
    isOpen,
    setShowModal,
    className,
    closeButtonClass,
    children,
}: Props) {
    const modalRef = useRef(null);

    function handleCloseModal() {
        if (onClose) {
            onClose();
        }
        setShowModal(false);
    }

    useEffect(() => {
        let timeout = null;

        if (isOpen) {
            document.body.style.marginRight = "15px";
            document.body.style.overflowY = "hidden";
        } else {
            timeout = setTimeout(() => {
                document.body.style.overflowY = "auto";
                document.body.style.marginRight = "0";
            }, 150);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [isOpen]);

    return (
        <div
            className={cn(
                "product-modal-overlay fixed top-0 left-0 z-50 invisible opacity-0 bg-black/70 w-full h-svh flex justify-center transition-all duration-150 items-center",
                isOpen && "visible opacity-100"
            )}
            onClick={(e) => {
                const target = e.nativeEvent?.target as HTMLElement;
                if (
                    !target ||
                    !target.classList?.contains("product-modal-overlay")
                )
                    return;
                handleCloseModal();
            }}
        >
            <div
                ref={modalRef}
                className={cn(
                    "relative  translate-y-[100%] duration-300 sm:duration-150 sm:translate-y-10 max-w-screen-lg w-full bg-white rounded-md p-6 transition-transform",
                    className,
                    isOpen && "translate-y-0 sm:translate-y-0",
                )}
            >
                <button
                    className={cn("absolute top-4 right-4 cursor-pointer z-50 text-sm", closeButtonClass)}
                    onClick={handleCloseModal}
                >
                    <X />
                </button>
                {children}
            </div>
        </div>
    );
}
