import { OrderStatusType, PaymentMethodType } from '@/types/orderTypes';
import mongoose, { InferSchemaType, Types } from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      enum: OrderStatusType,
      default: OrderStatusType.PAID,
    },
    method: {
      type: Number,
      enum: PaymentMethodType,
      required: true,
    },
  },
  { timestamps: true }
);

export type OrderSchemaType = InferSchemaType<typeof OrderSchema> & {
  _id: Types.ObjectId;
};

export type OrderType = Omit<
  OrderSchemaType,
  'createdAt' | 'updatedAt' | '_id'
>;

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
