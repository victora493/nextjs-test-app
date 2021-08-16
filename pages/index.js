import Head from 'next/head'
import Image from 'next/image'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList"
import imageSnk from '../public/AOT_Retour_du_Bataille_d%27exploration.png'

function HomePage({ meetups }) {
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
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>

            <Image 
                src={imageSnk} 
                placeholder="blur"
                
                width={640} 
                height={430}
            />

            <MeetupList meetups={meetups} />
        </>
    )
}

// generates the page on each load/request
// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     // fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// runs during build (npm build) process in the server, used to pass props commonly after fetching some data
export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://victora493:pilon123@cluster0.pdrhe.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString()
                }
            })
        },
        // pre-generates the page to be STATIC every n seconds
        revalidate: 1
    }
}

export default HomePage