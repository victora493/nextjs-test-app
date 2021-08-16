import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList"

function HomePage({ meetups }) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>

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
        // revalidate: 10
    }
}

export default HomePage