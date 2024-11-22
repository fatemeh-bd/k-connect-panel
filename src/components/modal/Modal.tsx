import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center ${
        isOpen ? "translate-y-0" : "translate-y-[100%] delay-500"
      }`}
    >
      <div
        className={`absolute inset-0 z-[999] bg-[#0000009c] dark:bg-[#000c] transition-opacity duration-500 delay-100 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      <div
        className={`relative bg-white z-[9999] rounded-lg dark:border border-secondary-200 w-11/12 md:max-w-xl mx-auto  overflow-y-auto
        transition-all duration-300 delay-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="py-4 px-6">
          <button
            onClick={handleClose}
            className="mr-auto ml-0 block cursor-pointer"
          >
            <XMarkIcon className="w-6 h-6 text-secondary-600" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
