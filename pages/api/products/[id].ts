import { productItems } from '@/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  const filtered = productItems.filter((item) => item.id.toString() === id);

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Product with id ${id} not found` });
  }
}
