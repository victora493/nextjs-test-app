import { useRouter } from 'next/router'
import Image from 'next/image'

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter()

  const showDetailsHandler = () => {
    // console.log(props.id)
    router.push(`/${props.id}`)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image 
            width={640} 
            height={430} 
            src={props.image} 
            alt={props.title}
            placeholder="blur"
            blurDataURL="https://jmperezperez.com/amp-dist/sample/sample-placeholder.png"
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
