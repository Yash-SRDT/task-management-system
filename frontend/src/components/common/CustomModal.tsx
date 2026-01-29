import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmText = "Create Task",
  cancelText = "Cancel",
  children,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <div className="modal-close" onClick={onClose}>
            ✕
          </div>
        </div>

        {/* BODY */}
        <div className="modal-body">{children}</div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn btn-secondary btn-full" onClick={onClose}>
            {cancelText}
          </button>

          <button className="btn btn-primary btn-full" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
