import React from 'react'

const Footer = () => {
    return (

        <div>
            <div className="skew bg-custom-green skew-bottom mr-for-radius">
                <svg
                    className="h-8 md:h-12 lg:h-10 w-full text-custom-gray"
                    viewBox="0 0 10 10"
                    preserveAspectRatio="none"
                >
                    <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
                </svg>
            </div>
            <div className="skew skew-bottom ml-for-radius">
                <svg
                    className="h-8 bg-custom-green md:h-12 lg:h-20 w-full text-custom-gray"
                    viewBox="0 0 10 10"
                    preserveAspectRatio="none"
                >
                    <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
                </svg>
            </div>
        </div>

    )
}

export default Footer
