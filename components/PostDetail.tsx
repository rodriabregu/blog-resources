import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { MdOutlineDateRange } from 'react-icons/md'
import { getContentFragment } from '../utils/getContentFragment'

const PostDetail = ({ post }: any) => {
  return (
    <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-mb">
        <img
          src={post.coverImage.url}
          alt={post.title}
          className="object-top w-full h-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center w-full mb-8">
          <div className="flex items-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
            <img
              src={post.author.picture.url}
              height="30px"
              width="30px"
              alt={post.author.name}
              className="align-middle rounded-full"
            />
            <p className="inline ml-2 text-lg text-gray-700 align-middle">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <MdOutlineDateRange className="w-full h-6" />
            <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj: any, index: number) => {
          const children = typeObj.children.map(
            (item: any, itemIndex: number) =>
              getContentFragment(itemIndex, item.text, item)
          )
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
