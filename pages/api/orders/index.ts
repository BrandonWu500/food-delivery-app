import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'POST':
      try {
        const order = await Order.create(req.body);
        console.log(req.body);
        res.status(201).json(order);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    default:
      break;
  }
};

export default handler;
