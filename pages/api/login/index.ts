import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      if (!process.env.TOKEN) {
        res.status(500).json('No Token');
        throw new Error('No Token');
      }
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      );
      res.status(200).json('Success');
    } else {
      res.status(400).json('Invalid Credentials');
    }
  }
};

export default handler;
