import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const id = query.id;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    case 'DELETE':
      try {
        const deletedId = await Product.findByIdAndDelete(id);
        res.status(200).json(`Product with id ${deletedId} has been deleted`);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
      break;

    default:
      throw new Error();
  }
}
