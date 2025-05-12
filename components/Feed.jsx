// This is where we display all of the prompts
"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from '../components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) =>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
 
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) =>{
    e.preventDefault();
    setSearchText(e.target.value)
  }

  useEffect(() =>{
    const fetchPosts = async () =>{
    const response = await fetch('/api/prompt')
    const data = await response.json()
    console.log(data)
    setPosts(data)
    }
    fetchPosts();
  }, [])

  return (
  <section className='feed w-full mt-10 '>
    <form className='relative w-full flex-center'>
      <input 
        type="text"
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer w-full text-center p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent '
      />
    </form>

    <PromptCardList
      data = {posts}
      handleTagClick={() => {}}

    />
  </section>
  )
}

export default Feed