// src/components/common/CenteredConfirmationModal.tsx
import React from "react";

interface CenteredConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const CenteredConfirmationModal: React.FC<CenteredConfirmationModalProps> = ({
  isOpen,
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center">


      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenteredConfirmationModal;
