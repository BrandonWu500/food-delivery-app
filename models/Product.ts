import mongoose, { InferSchemaType, Types } from 'mongoose';
import { Key } from 'react';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
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
          name: { type: String, required: true },
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
