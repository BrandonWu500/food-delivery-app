import mongoose, { InferSchemaType, Types } from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          name: { type: String, required: true, unique: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export type ProductType = InferSchemaType<typeof ProductSchema> & {
  _id: Types.ObjectId;
};

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
