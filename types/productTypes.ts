import { Types } from 'mongoose';

export type ProductItemType = {
  id: number | string;
  title: string;
  img: string;
  desc: string;
  price: number;
};

export type ProductOptionType = {
  _id?: Types.ObjectId;
  name: string;
  price: number;
};
