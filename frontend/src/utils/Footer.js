import React from 'react'

const Footer = () => {
    return (

        <div className="">
            <div className="skew bg-custom-yellow skew-bottom mr-for-radius">
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
                    className="h-8 bg-custom-yellow md:h-12 lg:h-20 w-full text-custom-gray"
                    viewBox="0 0 10 10"
                    preserveAspectRatio="none"
                >
                    <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
                </svg>
                <div className="bg-custom-yellow font-bold">© Timo Hanski</div>
            </div>
        </div>

    )
}

export default Footer
