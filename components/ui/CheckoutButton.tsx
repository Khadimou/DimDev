"use client";

import { useState } from "react";
import { Button } from "./Button";
import { MessageSquare } from "lucide-react";
import { Modal } from "./Modal";
import { ServiceRequestForm } from "./ServiceRequestForm";

interface CheckoutButtonProps {
  serviceId: string;
  serviceName: string;
  variant?: "primary" | "accent" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  serviceId,
  serviceName,
  variant = "primary",
  className = "",
  children,
}: CheckoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    // Keep modal open to show success message
    // It will auto-close after 2 seconds (handled in ServiceRequestForm)
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full">
        <Button
          variant={variant}
          className={`w-full ${className}`}
          onClick={handleOpenModal}
        >
          {children || (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Demander un devis
            </>
          )}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Demande de ${serviceName}`}
      >
        <ServiceRequestForm
          serviceId={serviceId}
          serviceName={serviceName}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </>
  );
}
