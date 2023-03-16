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
    cookies: { token },
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
      if (!token || token !== process.env.TOKEN) {
        res.status(403).json('Not authorized to do that');
      }
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      if (!token || token !== process.env.TOKEN) {
        res.status(403).json('Not authorized to do that');
      }
      try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      break;
  }
}
