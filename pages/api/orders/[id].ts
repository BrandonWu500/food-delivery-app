import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const order = await Order.findById(id);
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'PUT':
      break;

    case 'DELETE':
      break;

    default:
      break;
  }
}
