import { orderItems } from '@/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  const filtered = orderItems.filter((order) => order.id.toString() === id);
  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Order with id ${id} not found` });
  }
}
