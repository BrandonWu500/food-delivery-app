import { productItems } from '@/data';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    cookies: { token },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    case 'POST':
      if (!token || token !== process.env.TOKEN) {
        res.status(403).json('Not authorized to do that');
      }

      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    default:
      break;
  }
}
