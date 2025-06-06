"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, viewProfile }) => {
    const [copied, setCopied] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    };


    return (
        <div className='prompt_card rounded-md w-5/6 mx-auto mb-5 border p-4'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={() => viewProfile && viewProfile(post.creator._id)}>
                    <Image
                        src={post.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />
                    <div>
                        <h3 className='font-satoshi text-left font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt='copy'
                        width={15}
                        height={15}
                        className='cursor-pointer'
                    />
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700 text-left'>{post.prompt}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer text-left'
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>

            <div className='mt-5 flex justify-center gap-4 border-t border-gray-100 pt-3'>
                {handleEdit && (
                    <p
                        className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                )}
                {handleDelete && (
                    <p
                        className='font-inter text-sm orange_gradient cursor-pointer'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                )}
            </div>
        </div>
    );
};

export default PromptCard;
