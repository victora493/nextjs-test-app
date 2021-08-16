import classes from './MeetupDetail.module.css'
import Image from 'next/image'
import dataURL from '../../util/placeHolderDataURL';

export default function MeetupDetail({ title, image, address, description }) {
    return (
        <section className={classes.detail}>
            <Image 
                width={640} 
                height={430} 
                src={image} 
                alt=""
                priority
                placeholder="blur"
                blurDataURL={dataURL}
            />
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    )
}
