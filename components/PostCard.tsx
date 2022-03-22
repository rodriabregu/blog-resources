import React from 'react'
import moment from 'moment'
import { MdOutlineDateRange } from 'react-icons/md'
import Link from 'next/link'

const PostCard = ({ post }: any) => {
  const { node } = post
  return (
    <div className='p-0 pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8'>
      <div className='relative mb-6 overflow-hidden shadow-md pb-80'>
        <img 
          src={node.coverImage.url || ''}
          alt={node.title}
          className='absolute object-cover object-top w-full rounded-t-lg shadow-lg h-80 lg:rounded-lg'
        />
      </div>
      <h1 className='mb-8 text-3xl font-semibold text-center transition cursor-pointer duration-600 hover:text-pink-600'>
        <Link href={`/post/${node.slug}`}>
          {node.title}
        </Link>
      </h1>
      <div className='items-center justify-center block w-full mb-8 text-center lg:flex'>
        <div className='flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto'>
          <img 
            src={node.author.picture.url}
            height='30px'
            width='30px'
            alt={node.author.name}
            className='align-middle rounded-full'
          />
          <p className='inline ml-2 text-lg text-gray-700 align-middle'>{node.author.name}</p>
        </div>
          <div className='font-medium text-gray-700'>
            <MdOutlineDateRange className='w-full h-6 ' />
            <span>
              {moment(node.createdAt).format('MMMM DD, YYYY')}
            </span>
          </div>
      </div>
      <p className='px-4 mb-8 text-lg font-normal text-center text-gray-700 lg:px-20'>{node.excerpt}</p>
      <div className='text-center'>
        <Link href={`/post/${node.slug}`}>
          <span className='inline-block px-8 py-1 text-lg font-medium text-white transition duration-500 transform bg-pink-600 rounded-full cursor-pointer hover:translate-y-1'>
            Continue reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard