import footerStyles from '@/styles/Footer.module.scss';
import footerImg from '@/public/images/footerImg.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { server } from '@/config';

type StreetType = {
  number: number;
  name: string;
};

type LocationType = {
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

const Footer = () => {
  const [footerLocations, setFooterLocations] = useState<ResultType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch(`${server}/api/locations`);
      const data = await res.json();
      const { results } = data;
      localStorage.setItem('footerLocations', JSON.stringify(results));
      setFooterLocations(results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (footerLocations.length === 0) {
      const locStorLocations = localStorage.getItem('footerLocations');
      const locs = locStorLocations && JSON.parse(locStorLocations);
      if (locs) {
        setFooterLocations(locs);
      } else {
        fetchData();
      }
    }
  }, []);
  useEffect(() => {
    if (footerLocations.length > 0) {
      let locs: LocationType[] = [];
      footerLocations.forEach((item) => {
        const { name, number } = item.location.street;
        locs.push({
          ...item.location,
          phone: item.phone,
          streetName: name,
          streetNumber: number,
        });
      });
      setLocations(locs);
    }
  }, [footerLocations]);
  return (
    <div className={footerStyles.container}>
      <div className={footerStyles.imgContainer}>
        <Image src={footerImg} alt="" fill />
      </div>
      <div className={footerStyles.textContainer}>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
          blanditiis?
        </span>
        <div className={footerStyles.col}>
          <h3>FIND OUR RESTAURANTS</h3>
          <ul>
            {locations.map((loc: LocationType, locIdx) => (
              <li key={locIdx}>
                <p>{`${loc.streetNumber} ${loc.streetName}`}</p>
                <p>{`${loc.city}, ${loc.state} ${loc.postcode}`}</p>
                <p>{loc.phone}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={footerStyles.col}>
          <h3>OPEN HOURS</h3>
          <ul>
            <li>
              <p>Mon - Fri</p>
              <p>9am to 7pm</p>
            </li>
            <li>
              <p>Sat - Sun</p>
              <p>11am to 10pm</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
