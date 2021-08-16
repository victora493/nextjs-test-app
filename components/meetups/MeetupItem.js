import { useRouter } from 'next/router'
import Image from 'next/image'
import dataURL from '../../util/placeHolderDataURL';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter()

  const showDetailsHandler = () => {
    // console.log(props.id)
    router.push(`/${props.id}`)
  }

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

    const toBase64 = (str) => {
      return typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)
    }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image 
            src={props.image} 
            alt={props.title}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(640, 430))}`}
            width={640} 
            height={430}
          />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
