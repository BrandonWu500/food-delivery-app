import { server } from '@/config';
import { ProductType } from '@/models/Product';
import editModalStyles from '@/styles/EditModal.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

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
  const [file, setFile] = useState<File>();
  const router = useRouter();

  useEffect(() => {
    if (!editProductRef.current) return;
    setProduct({
      ...editProductRef.current,
      pricesStr: editProductRef.current.prices.join(', '),
    });
  }, [editProductRef]);

  useEffect(() => {
    if (!modalRef.current) return;

    if (showModal) {
      modalRef.current.style.display = 'flex';
    } else {
      modalRef.current.style.display = 'none';
    }
  }, [showModal]);

  const uploadImg = async () => {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        data
      );
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!product) return;

    let imgUrl = product.img;

    if (file) {
      imgUrl = await uploadImg();
    }

    // convert input str array back to arr of numbers to fit db type
    const arrNumPrices = product.pricesStr.split(', ').map(Number);
    const { pricesStr, ...rest } = product;

    const updateProduct = async () => {
      try {
        const res = await axios.put(`${server}/api/products/${product._id}`, {
          ...rest,
          prices: arrNumPrices,
          img: imgUrl,
        });
        router.reload();
      } catch (error) {
        console.log(error);
      }
    };

    product && updateProduct();
  };

  return (
    <div className={editModalStyles.container}>
      <div className={editModalStyles.overlay} ref={modalRef}>
        <form
          className={editModalStyles.modal}
          onSubmit={handleSubmit}
          method="post"
        >
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
                <label htmlFor="desc">Description</label>
                <textarea
                  name="desc"
                  id="desc"
                  value={product.desc}
                  onChange={(e) =>
                    setProduct({ ...product, desc: e.target.value })
                  }
                ></textarea>
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
                <input
                  type="file"
                  name="img"
                  id="img"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setFile(e.target.files[0]);
                  }}
                />
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
