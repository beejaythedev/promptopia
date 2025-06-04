// This is where we display all of the prompts
"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import PromptCard from '../components/PromptCard'

const PromptCardList = ({ data, handleTagClick, viewProfile }) =>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          viewProfile={viewProfile}
        />
      ))}
    </div>
  )
}
 
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [allposts, setAllPosts] = useState([])
  
  const handleSearchChange = (e) =>{
    e.preventDefault();
    setSearchText(e.target.value)
  }
  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  }

  const viewProfile = (username) => {
    // Navigate to the user's profile page
    window.location.href = `/profile/${username}`;
  }
  // Fetch all posts from the server when the component mounts
  useEffect(() =>{
    const fetchPosts = async () =>{
    const response = await fetch('/api/prompt')
    const data = await response.json()
    console.log(data)
    setAllPosts(data)
    setPosts(data)
    }
    fetchPosts();
  }, [])



  //Implement live search functionality with debounce
  useEffect(()=>{
    const timeout = setTimeout(() =>{
    if(searchText){
        const filteredPosts = allposts.filter(allpost => 
          allpost.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          allpost.creator.username.toLowerCase().includes(searchText.toLowerCase())|| 
          allpost.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setPosts(filteredPosts);
      }

    else {
      // If search text is empty, reset to all posts
      setPosts(allposts);
    }
    }, 500)

    return () => clearTimeout(timeout);
  },[searchText])

  return (
  <section className='feed w-full mt-10 '>
    <form className='relative w-2/4 m-auto flex items-center gap-4'>
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
      handleTagClick={handleTagClick}
      viewProfile={viewProfile}

    />
  </section>
  )
}

export default Feed