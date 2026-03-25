// const blogs: any[] = []
//
// export async function POST(req: Request) {
//     const body = await req.json()
//
//     const newBlog = {
//         id: Date.now(),
//         title: body.title
//     }
//
//     blogs.push(newBlog)
//
//     return Response.json(newBlog)
// }
//
// export async function GET() {
//     return Response.json(blogs)
// }

type Blog = {
    id: number
    title: string
}

const blogs: Blog[] = []

export async function POST(req: Request) {
    const body = await req.json()

    const newBlog = {
        id: Date.now(),
        title: body.title
    }

    blogs.push(newBlog)

    return Response.json(newBlog)
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const blogId = params.id

    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page')

    return Response.json({
        blogId,
        page
    })
}