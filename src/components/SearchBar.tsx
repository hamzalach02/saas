import React from 'react'

const SearchBar = () => {
  return (
    <div className='max-w-md mx-auto flex justify-center'>
    <div className="bg-white px-2  flex items-center justify-between xl:w-[500px]  md:w-[450px] w-[340px]  border  h-12 rounded-xl shadow-lg ">
      

        <input
        className="peer h-full w-full outline-none text-sm   "
        type="text"
        id="search"
        placeholder="Search something.." /> 
          <div className="grid place-items-center h-full w-12 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
  </div>
  )
}

export default SearchBar