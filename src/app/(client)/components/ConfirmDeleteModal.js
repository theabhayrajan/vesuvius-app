export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;



  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md w-full max-w-sm">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-6">Are you sure you want to suspend this client?</p>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
