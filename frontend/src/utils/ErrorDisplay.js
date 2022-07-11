import React from 'react'

const ErrorDisplay = ({first, second}) => {
  return (
    <div>
      <h2 className='text-custom-red text-center font-semibold mb-3'>{first} {" "} {second}</h2>
    </div>
  )
}

export default ErrorDisplay
