import React from 'react'
import { needsFin } from '../../utils/needs'
import styled from "styled-components"

/* since nested groups are not supported we have to use 
   regular css for the nested dropdowns 
*/
const Container = styled.div`
li>ul                 {transform: translatex(100%) scale(0) }
li:hover>ul           {transform: translatex(101%) scale(1) }
li > button svg       {transform: rotate(-90deg) }
li:hover > button svg {transform: rotate(-270deg) }

.group:hover .group-hover\:scale-100 {transform: scale(1) }
.group:hover .group-hover\:-rotate-180 {transform: rotate(180deg) }
.scale-0 {transform: scale(0) }
.min-w-32 {min-width: 8rem }
`;
const NeedsModal = () => {

    return (
        <div>
            <Container className="mt-5 ml-5">
                <div class="group inline-block">
                    <button
                        class="outline-none focus:outline-none px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center min-w-32"
                    >
                        <span class="pr-1 font-semibold text-white flex-1">Needs</span>
                        <span>
                            <svg
                                class="fill-white h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                        </span>
                    </button>
                    <ul
                        class="bg-blue-500 rounded-lg transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
                    >
                            {needsFin.data.map((item) => {
                                return (
                                    <>
                                        <li class=" text-white relative  px-3 py-1 bg-blue-500 hover:bg-blue-600">
                                            <button
                                                class="w-full text-left flex items-center outline-none focus:outline-none"
                                            >
                                                <span class="pr-1 flex-1">{item.need}</span>
                                                <span class="mr-auto">
                                                    <svg
                                                        class="fill-current h-4 w-4
                                            transition duration-150 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul
                                                class="absolute top-0 right-0 
                                  transition duration-150 ease-in-out origin-top-left
                                  min-w-32
                                  "
                                            >
                                                {item.subneed.map((sub) => {
                                                    return <li class="px-3 py-1 bg-blue-500 hover:bg-blue-600">{sub.need}</li>
                                                })}
                
                                            </ul>
                                        </li>
                                    </>
                                )
                            })}

                    </ul>
                </div>

            </Container>
        </div>
    )
}

export default NeedsModal
