"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import PromptCard from '../components/PromptCard'


const UserProfile = ({ id }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            console.log(data);
            setPosts(data); // Store posts in state
          } 
          
          catch (error) {
            console.error('Error fetching posts:', error);
          }

          finally {
            setLoading(false); // Set loading to false after fetching
          }
        };
    
        if (id) fetchPosts();
      }, [id]);

      const username = posts.length > 0 ? posts[0].creator.username : 'User';

  return (
    <div className='mt-16 prompt_layout'>
        
        {loading ? 
            ( 
                <p className='text-gray-500 text-center'>Loading...</p>
            ) 
            : 
            (
                (posts.length === 0 ?
                    (
                        <p className='text-gray-500'>No posts found for this user.</p>
                    ) 
                    : 
                    (   
                        <div className='w-full text-center mb-5'>
                            <h1 className='text-3xl font-bold mb-10'>{username}'s Profile</h1>
                                {posts.map((post) => (
                                    <PromptCard 
                                        key={post._id}
                                        post={post}
                                    />
                                    ))
                                }
                        </div>
                    )
                )
            )
        }
            
        </div>
  )
}

export default UserProfile