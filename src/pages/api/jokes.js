import OpenAI from 'openai';

export default async function handler(req, res) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_API_KEY,
        });
        const { prompt } = req.query;
        const completion = await openai.complete({
            engine: 'gpt-3.5-turbo',
            prompt: prompt,
            maxTokens: 50,
            temperature: 0.7,
            n: 1
        });
        const joke = completion.data.choices[0].text.trim();
        // async function main() {
        //     const chatCompletion = await openai.chat.completions.create({
        //         messages: [{ role: 'user', content: 'Say this is a test' }],
        //         model: 'davinci-002',
        //     });
        //     console.log(chatCompletion);
        // }
        // main();
        res.status(200).json({ joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}