import React from 'react'

const LoadingButton = () => {
    return (
        <button
            disabled
            className="py-4 w-full bg-gray-500 text-white font-bold rounded-full transition duration-200"
        >
            Loading...
        </button>
    )
}

export default LoadingButton
