import React from 'react'

export const getContentFragment = (
  index: any,
  text: any,
  obj: any,
  type?: any
) => {
  let modifiedText = text
  if (obj) {
    if (obj.bold) {
      modifiedText = <b key={index}>{text}</b>
    }
    if (obj.italic) {
      modifiedText = <em key={index}>{text}</em>
    }
    if (obj.underline) {
      modifiedText = <u key={index}>{text}</u>
    }
  }

  switch (type) {
    case 'heading-three':
      return (
        <h3 key={index} className="mb-4 text-xl font-semibold">
          {modifiedText.map((item: object, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h3>
      )
    case 'paragraph':
      return (
        <p key={index} className="mb-8">
          {modifiedText.map((item: object, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </p>
      )
    case 'heading-four':
      return (
        <h4 key={index} className="mb-4 font-semibold text-md">
          {modifiedText.map((item: object, i: number) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </h4>
      )
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      )
    default:
      return modifiedText
  }
}
