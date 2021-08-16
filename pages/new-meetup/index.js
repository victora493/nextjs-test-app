// our-domain.com/new-meetup
import { useRouter } from 'next/router'
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetup() {
    const router = useRouter()

    const addMeetupHandler = async (payload) => {
        console.log(payload)
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        console.log(data)

        router.replace('/')
    }

    return (
        <>
            <Head>
                <title>Add a new Meetup</title>
                <meta 
                    name="description" 
                    content="Add your own meetups and create amazing networking opportunities!"
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetup