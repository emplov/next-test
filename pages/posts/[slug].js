import { useRouter } from 'next/router';

const Post = ({ data }) => {
    const router = useRouter()
    const { slug } = router.query
    console.log(data)

    return <p>Post: {slug}</p>
}

// This gets called on every request
export async function getServerSideProps(context) {
    const slug = context.params.slug;

    console.log(slug)
    // Fetch data from external API

    const response = await fetch(`https://djomi.uz/api/v1/posts/${slug}`, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    const data = await response.json();

    if (data.success) {
        return { props: { data: data.result.post } }
    }

    return {
        notFound: true
    }
}

export default Post;
