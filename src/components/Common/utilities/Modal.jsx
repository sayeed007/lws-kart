"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Close from '../../../../public/assets/icons/xmark.svg';


export default function Modal({ children, onDismiss, modalTitle }) {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const handleDismiss = useCallback(() => {
        if (onDismiss) onDismiss();
        // router.back();
    }, [onDismiss, router]);

    const onClick = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                handleDismiss();
            }
        },
        [handleDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                handleDismiss();
            }
        },
        [handleDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return createPortal(
        <div
            ref={overlay}
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-3/5 p-6 dark:bg-body bg-white"
            >
                <div className="flex justify-between items-center mb-4 ">
                    <div></div>
                    <h2 className="text-xl font-bold">{modalTitle}</h2>
                    <button onClick={handleDismiss}>
                        <Close
                            alt="close"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}
