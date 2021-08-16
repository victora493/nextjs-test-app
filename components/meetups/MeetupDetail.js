import classes from './MeetupDetail.module.css'
import Image from 'next/image'

export default function MeetupDetail({ title, image, address, description }) {
    return (
        <section className={classes.detail}>
            <Image 
                width={640} 
                height={430} 
                src={image} 
                alt=""
                priority
            />
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    )
}
