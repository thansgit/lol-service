import React from 'react'

const Message = ({ own }) => {
    return (
        <div className="flex flex-col mt-4">
            {/* Top */}


            <div className={own ? "flex justify-end" : "flex"}>
                <img src="https://cdn.pixabay.com/photo/2022/02/10/08/02/extraterrestrial-7004805__340.png"
                    alt=""
                    className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className="p-2 rounded-2xl bg-custom-blue max-w-xs ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                </p>
            </div>
            {/* Bottom */}
            <div className={own ? "flex text-sm mt-2 justify-end" : "flex text-sm mt-2"}>
                1 Hour ago
            </div>

        </div>
    )
}

export default Message
