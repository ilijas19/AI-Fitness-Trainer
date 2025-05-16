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
          className="bg-gray-800 max-w-[600px] w-full h-fit sm:mt-20 not-sm:py-12 not-sm:h-full  p-4 sm:rounded-xl mx-4"
        >
          {children}
        </div>
      </div>
    )
  );
};
export default Modal;
