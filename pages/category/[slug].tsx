import { useRouter } from 'next/router'

import { getCategories, getCategoryPost } from '../../services'
import { PostCard, Categories, Loader } from '../../components'

interface CategoriesPaths {
  name: string
  slug: string
}

const CategoryPost = ({ posts }: any) => {
  const router = useRouter()

  if (router.isFallback) return <Loader />

  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: any, index: number) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPost

export async function getStaticProps({ params }: any) {
  const posts = await getCategoryPost(params.slug)
  return {
    props: { posts },
  }
}

export async function getStaticPaths() {
  const categories: [CategoriesPaths] = await getCategories()
  console.log('categories', categories)

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
