"use client"

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Form from './Form'

const EditPrompt = ({ promptId }) => {
    const router = useRouter();
  

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({ prompt: '', tag: '' })
  

    useEffect(() =>{
        const fetchPostDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
           
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (promptId) fetchPostDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if (!promptId) return alert('Prompt ID not found')
        

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
              
                })
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt