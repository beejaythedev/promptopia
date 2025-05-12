import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col p-4'>
        <h1 className='head_text text-left text-3xl font-bold text-sky-600'>{type} Post</h1>
        <p className='desc text-left max-w-md mt-5'> {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.</p>

        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
            <label>
                <div className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</div>
                <textarea 
                    value={post.prompt}
                    onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                    placeholder='Write your prompt here...'
                    required
                    className='form_textarea w-full h-50 mt-3 p-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
            </label>
            <label>
                <div className='font-satoshi font-semibold text-base text-gray-700'>Tag {` `}
                    <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
                </div>
                <input 
                    value={post.tag}
                    onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    placeholder='#tag'
                    required
                    className='form_input mt-3 w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
            </label>

            <div className='flex justify-end items-center px-4 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>
                <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200 cursor-pointer'>
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Form