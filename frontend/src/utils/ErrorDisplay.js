import React from 'react'

const ErrorDisplay = ({serverErr, appErr}) => {
  return (
    <div>
      <h2 className='text-custom-red text-center font-semibold mb-3'>{serverErr} - {appErr}</h2>
    </div>
  )
}

export default ErrorDisplay
