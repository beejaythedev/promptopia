import { connectToDB } from '../../../utils/database'; // Import the database connection function

import Prompt from '../../../models/prompt'; // Import the Prompt model

export const GET = async (req) => {
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200})
    }
    catch(error){
        return new Response("failed to fetch all prompts", { status: 500})
    }
}
