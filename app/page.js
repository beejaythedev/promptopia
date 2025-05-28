import React from 'react'
import Feed from '../components/F\eed'

const page = () => {
  return (
    <>
    <section className='flex flex-col items-center mt-10 text-center p-4'> 
      <h1 className='text-5xl font-bold'>Discover & Share</h1>
      <h1 className='text-3xl font-bold mt-5'>AI-Powered Prompts</h1>
      <p className='text-gray-500 mt-10'>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

      <Feed />
    </section>

      
      
    </>
    
  )
}

export default page