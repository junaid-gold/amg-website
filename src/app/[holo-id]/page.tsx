import { redirect } from 'next/navigation'

const page = ({ params }: { params: { "holo-id": string } }) => {
    redirect(`hologram-details/${params['holo-id']}`)

}

export default page