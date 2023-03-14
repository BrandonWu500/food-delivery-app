import { reset } from '@/redux/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import comfirmModalStyles from '@/styles/ConfirmModal.module.scss';
import { RefObject } from 'react';

type ConfirmModalProps = {
  modalRef: RefObject<HTMLDivElement>;
};

const ConfirmModal = ({ modalRef }: ConfirmModalProps) => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.style.display = 'none';
  };
  return (
    <div className={comfirmModalStyles.container} ref={modalRef}>
      <div className={comfirmModalStyles.modal}>
        <h1>Are you sure you want to clear your cart?</h1>
        <div className={comfirmModalStyles.modalBtns}>
          <button
            onClick={() => {
              dispatch(reset());
              closeModal();
            }}
            className={comfirmModalStyles.yes}
          >
            Yes
          </button>
          <button onClick={closeModal} className={comfirmModalStyles.no}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
