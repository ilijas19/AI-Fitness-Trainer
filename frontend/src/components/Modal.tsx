type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isModalOpen, onClose, children }: ModalProps) => {
  return (
    isModalOpen && (
      <div
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
        className="fixed inset-0  flex justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 max-w-[600px] w-full h-fit mt-16  p-4 rounded-xl"
        >
          {children}
        </div>
      </div>
    )
  );
};
export default Modal;
