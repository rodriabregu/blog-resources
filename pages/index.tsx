import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services'

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className="container px-10 mx-auto mb-8">
      <Head>
        <title>Resources Folder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <article className="col-span-1 lg:col-span-8">
          {posts.map((post: any, index: any) => (
            <PostCard post={post} key={index} />
          ))}
        </article>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget categories={''} slug={''} />
            <Categories />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
