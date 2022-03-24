import { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const commentEl: any = useRef()
  const nameEl: any = useRef()
  const emailEl: any = useRef()
  const storeDataEl: any = useRef()

  const handleCommentSubmit = (e: any) => {
    e.preventDefault()
    setError(false)
    const { value: comment }: any = commentEl.current
    const { value: name }: any = nameEl.current
    const { value: email }: any = emailEl.current
    const { checked: storeData }: any = storeDataEl.current

    if (!comment || !name || !email) return setError(true)

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }

    submitComment(commentObj).then((res: any) => {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    })
  }

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        Leave a comment here!
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment write here"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full px-4 py-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="w-full px-4 py-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 text-gray-500 cursor-pointer"
            htmlFor="storeData"
          >
            Save my email, and name for the futures comments
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleCommentSubmit}
          className="inline-block px-4 py-1 text-lg text-white duration-500 bg-pink-300 rounded-full cursor-pointer tranition ease hover:bg-indigo-900"
        >
          Submit comment
        </button>
        {showSuccess && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submit!
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
