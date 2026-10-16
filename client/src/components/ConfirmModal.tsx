interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  taskTitle?: string;
  title?: string;
  message?: string;
  confirmLabel?: string;
}

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  taskTitle,
  title = "Delete Task",
  message,
  confirmLabel = "Delete",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[12px] p-6 w-full max-w-[400px] shadow-lg">
        <h2 className="font-['Signika_Negative'] font-semibold text-[20px] text-[#292929] mb-2">
          {title}
        </h2>
        <p className="font-['Signika_Negative'] text-[15px] text-[#737171] mb-6">
          {message ?? (
            <>
              Are you sure you want to delete
              {taskTitle ? ` "${taskTitle}"` : " this task"}? This can't be undone.
            </>
          )}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-[8px] font-medium text-[15px] text-[#292929] border border-[#B8B6B6] hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-[8px] font-medium text-[15px] text-white bg-[#974FD0] hover:bg-[#7e3fb0] cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
