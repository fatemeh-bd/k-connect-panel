import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Title from "../typography/Title";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] backdrop-blur-[2px] flex items-center justify-center ${isOpen ? "translate-y-0" : "translate-y-[100%] delay-500"
        }`}
    >
      <div
        className={`absolute inset-0 z-[999] bg-[#0000009c] dark:bg-[#000c] transition-opacity duration-500 delay-100 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={handleClose}
      ></div>

      <div
        className={`relative bg-white z-[9999] rounded-lg dark:border border-secondary-200  mx-auto  overflow-y-auto
        transition-all duration-300 delay-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        } ${className || ""}`}
      >
        <div className="py-4 px-6">

          <div className="flex justify-between items-center mb-3">
          <Title className="!mb-0">{title}</Title>

            <button
              onClick={handleClose}
              className="ml-0 block cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6 text-secondary-600" />

            </button>
          </div>
          <hr></hr>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
