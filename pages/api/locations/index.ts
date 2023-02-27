// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://randomuser.me/api?nat=us&results=4';

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
}
