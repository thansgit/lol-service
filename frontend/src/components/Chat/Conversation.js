import React from 'react'

const Conversation = () => {
  return (
    <div className="flex items-center p-2 mt-5 cursor-pointer hover:bg-custom-gray-hover">
      <img src="https://cdn.pixabay.com/photo/2022/02/10/08/02/extraterrestrial-7004805__340.png" alt="" 
      className="w-10 h-10 rounded-full object-cover mr-5"
      />
      <span className="text-white font-medium">John doe</span>
    </div>
  )
}

export default Conversation
