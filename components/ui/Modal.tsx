"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "2xl" }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Add class to prevent scroll
      document.body.classList.add('modal-open');

      // Restore scroll position visually (since body is now fixed)
      document.body.style.top = `-${scrollY}px`;

      // Trigger animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      // Get scroll position before removing fixed
      const scrollY = document.body.style.top;

      // Remove class to restore scroll
      document.body.classList.remove('modal-open');
      document.body.style.top = '';

      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

      setIsAnimating(false);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      setIsAnimating(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-2xl shadow-2xl transition-all duration-200 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="font-heading font-bold text-2xl text-dark">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
