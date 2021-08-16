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

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image 
            src={props.image} 
            alt={props.title}
            placeholder="blur"
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
