// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://randomuser.me/api?nat=us&results=4';

type StreetType = {
  number: number;
  name: string;
};

export type LocationType = {
  street: StreetType;
  city: string;
  state: string;
  postcode: number;
  phone?: string;
  streetNumber?: number;
  streetName?: string;
};

type ResultType = {
  location: LocationType;
  phone: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const { results } = data;
    let locs: LocationType[] = [];
    results.forEach((item: ResultType) => {
      const { name, number } = item.location.street;
      locs.push({
        ...item.location,
        phone: item.phone,
        streetName: name,
        streetNumber: number,
      });
    });
    res.status(200).json(locs);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
}
