import { server } from '@/config';
import addModalStyles from '@/styles/AddModal.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

type Extra = {
  name: string;
  price: number;
};

type AddModalProps = {
  setShowModal: any;
};

const AddModal = ({ setShowModal }: AddModalProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    img: '',
    title: '',
    desc: '',
    sm: 0,
    md: 0,
    lg: 0,
  });
  const [file, setFile] = useState<File>();
  const [extras, setExtras] = useState<Extra[]>([]);
  const [extra, setExtra] = useState<Extra>({ name: '', price: 0 });

  const addExtra = () => {
    if (extra.name === '' || extra.price === 0) return;
    setExtras([...extras, extra]);
  };

  const imageUpload = async () => {
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');

    try {
      console.log(process.env.NEXT_PUBLIC_CLOUDINARY_NAME);
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
    const imgUrl = await imageUpload();
    const { sm, md, lg, ...rest } = formData;
    const sizes = [sm, md, lg];
    const productData = {
      ...rest,
      prices: sizes,
      extraOptions: extras,
      img: imgUrl,
    };
    try {
      const res = await axios.post(`${server}/api/products`, productData);
      console.log(res.data);
      setShowModal(false);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={addModalStyles.container}>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Add a New Item</h1>
        <div className={addModalStyles.formGroup}>
          <label htmlFor="imgUpload">Choose an image</label>
          <input
            type="file"
            name="imgUpload"
            id="imgUpload"
            required
            onChange={(e) => {
              if (!e.target.files) return;
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className={addModalStyles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className={addModalStyles.formGroup}>
          <label htmlFor="desc">Desc</label>
          <textarea
            name="desc"
            id="desc"
            required
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          ></textarea>
        </div>
        <div className={addModalStyles.formGroup}>
          <label htmlFor="small">Prices</label>
          <div className={addModalStyles.inputGroup}>
            <input
              type="text"
              name="small"
              id="small"
              placeholder="Small"
              required
              onChange={(e) =>
                setFormData({ ...formData, sm: Number(e.target.value) })
              }
            />
            <input
              type="text"
              name="medium"
              id="medium"
              placeholder="Medium"
              onChange={(e) =>
                setFormData({ ...formData, md: Number(e.target.value) })
              }
            />
            <input
              type="text"
              name="large"
              id="large"
              placeholder="Large"
              onChange={(e) =>
                setFormData({ ...formData, lg: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className={addModalStyles.formGroup}>
          <label htmlFor="extra1">Add Extra</label>
          <div className={addModalStyles.inputGroup}>
            <input
              type="text"
              name="extra-name"
              id="extra-name"
              placeholder="Extra Name"
              onChange={(e) => setExtra({ ...extra, name: e.target.value })}
            />
            <input
              type="number"
              name="extra-price"
              id="extra-price"
              placeholder="Price"
              onChange={(e) =>
                setExtra({ ...extra, price: Number(e.target.value) })
              }
            />
            <button
              type="button"
              className={addModalStyles.addExtra}
              onClick={addExtra}
            >
              Add Extra
            </button>
          </div>
        </div>
        <div className={addModalStyles.formGroup}>
          <h3>Current Extras:</h3>
          <p className={addModalStyles.extras}>
            {extras.map((item, idx) => (
              <span className={addModalStyles.extra} key={idx}>
                {item.name}: ${item.price.toFixed(2)}
              </span>
            ))}
          </p>
        </div>
        <button type="submit" className={addModalStyles.create}>
          Create
        </button>
        <button
          type="button"
          className={addModalStyles.close}
          onClick={() => setShowModal(false)}
        >
          X
        </button>
      </form>
    </div>
  );
};
export default AddModal;
