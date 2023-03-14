import { server } from '@/config';
import { ProductType } from '@/models/Product';
import editModalStyles from '@/styles/EditModal.module.scss';
import axios from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';

type EditModalProps = {
  editProductRef: any;
  showModal: boolean;
  setShowModal: any;
};

type EditProductType = Partial<ProductType> & {
  pricesStr: string;
};

const EditModal = ({
  editProductRef,
  showModal,
  setShowModal,
}: EditModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<EditProductType>();

  useEffect(() => {
    setProduct({
      ...editProductRef.current,
      pricesStr: editProductRef.current.prices.join(', '),
    });
  }, [editProductRef.current]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (showModal) {
      modalRef.current.style.display = 'flex';
    } else {
      modalRef.current.style.display = 'none';
    }
  }, [showModal]);

  const handleSubmit = (e: FormEvent) => {
    if (!product) return;

    // convert input str array back to arr of numbers to fit db type
    const arrNumPrices = product.pricesStr.split(', ').map(Number);
    const { pricesStr, ...rest } = product;

    const updateProduct = async () => {
      try {
        const res = await axios.put(`${server}/api/products/${product._id}`, {
          ...rest,
          prices: arrNumPrices,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    product && updateProduct();
  };

  return (
    <div className={editModalStyles.container}>
      <div className={editModalStyles.overlay} ref={modalRef}>
        <form className={editModalStyles.modal} onSubmit={handleSubmit}>
          <h1>{product ? 'Edit Product' : 'Loading'}</h1>
          {product && (
            <>
              <div className={editModalStyles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                />
              </div>
              <div className={editModalStyles.formGroup}>
                <label htmlFor="prices">{`Prices (separate with comma and 1 space)`}</label>
                <input
                  type="text"
                  name="prices"
                  id="prices"
                  value={product.pricesStr}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      pricesStr: e.target.value,
                    })
                  }
                />
              </div>
              <div className={editModalStyles.formGroup}>
                <label htmlFor="title">Image</label>
                <input type="file" name="img" id="img" />
              </div>
              <div className={editModalStyles.btns}>
                <button className={editModalStyles.update} type="submit">
                  Update
                </button>
                <button
                  className={editModalStyles.cancel}
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditModal;
