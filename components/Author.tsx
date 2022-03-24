import React from 'react'
import Image from 'next/image'

const Author = ({ author }: any) => {
  return (
    <div className="relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          src={author.picture.url}
          alt={author.name}
          height="100px"
          width="100px"
          className="object-cover align-middle rounded-full"
        />
      </div>
      <h3 className="my-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-lg text-white">{author.biography}</p>
    </div>
  )
}

export default Author
