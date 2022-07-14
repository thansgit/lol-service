import React from 'react'

const ErrorDisplay = (props) => {
  return (
    <div>
      <h2 className='text-custom-red text-center font-semibold'>{props?.first} {" "} {props?.second}</h2>
    </div>
  )
}

export default ErrorDisplay
