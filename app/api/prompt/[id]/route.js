import { connectToDB } from '../../../../utils/database'; // Import the database connection function

import Prompt from '../../../../models/prompt'; // Import the Prompt model

export const GET = async (req, context) => {
    const { params } = context; // Extract the params from the context

    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response("Promt not found", { status: 404})

        return new Response(JSON.stringify(prompt), { status: 200})
    }
    catch(error){
        return new Response("failed to fetch all prompts", { status: 500})
    }
}


export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json(); // Parse the request body

    try {
        await connectToDB(); // Connect to the database
        const existingPrompt = await Prompt.findById(params.id); // Find the existing prompt by ID

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt; // Update the prompt field
        existingPrompt.tag = tag; // Update the tag field

        await existingPrompt.save(); // Save the updated prompt to the database

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } 
    catch (error) {
        return new Response('Failed to update prompt', { status: 500 });
    }
}

export const DELETE = async (req, context) => {
    const { params } = context; // Extract the params from the context
    try {
        await connectToDB(); // Connect to the database
        await Prompt.findByIdAndDelete(params.id); // Find and remove the prompt by ID

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete prompt', { status: 500 });
    }
}