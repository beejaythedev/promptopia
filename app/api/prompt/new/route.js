import { connectToDB } from '../../../../utils/database'; // Import the database connection function
import Prompt from '../../../../models/prompt'; // Import the Prompt model

export const POST = async (req, res) => {
    const { prompt, tag, userId } = await req.json(); // Parse the request body

    try {
        await connectToDB(); // Connect to the database
        const newPrompt = new Prompt({
            prompt,
            tag,
            creator: userId, // Set the creator field to the user ID
        });
        await newPrompt.save(); // Save the new prompt to the database

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 });
    }
}
