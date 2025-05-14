import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete}) => {
    console.log(data)
  return (
    <section className='w-full p-4'>
        <h1 className='text-3xl'>{name} profile</h1>
        <p className='mt-5'>{desc}</p>

        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
            
              <PromptCard 
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
              
            ))}

            
        </div>
    </section>
  )
}

export default Profile