import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    slug
      ? getSimilarPosts(categories, slug).then((res: any) =>
          setRelatedPosts(res)
        )
      : getRecentPosts().then((res: any) => setRelatedPosts(res))
  }, [slug])

  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        {slug ? 'Similar Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post: any, index: any) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="flex-none w-16">
            <Image
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.coverImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MMMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
