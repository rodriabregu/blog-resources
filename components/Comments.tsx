import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'

const Comments = ({ slug }: any) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((comments) => setComments(comments))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
            {comments.length} Comments
          </h3>
          {comments.map((comment: any) => (
            <div
              key={comment.createdAt}
              className="pb-4 mb-4 border-b border-gray-100"
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMMM DD YYYY')}
              </p>
              <p className="w-full text-gray-600 whitespace-pre-line">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
