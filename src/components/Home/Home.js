import React, { useRef, useState } from 'react';
import Navbar from '../navbar/Navbar';


const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await fetch('http://localhost:5000/generate_joke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch joke');
            }
            setJoke(data.joke);
            setPrompt('')
        } catch (error) {
            console.error('Error fetching joke:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='home-main'>
            <Navbar />
            <div className='home-content'>
                <div className='home-top'>
                    <div className='home-title'>
                        AI Joke Generator 🔥
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className='ai-input'
                        type='text'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Enter your prompt'
                    /><br />
                    <button type='submit' className='ai-submit'>Generate</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p className='ai-error'>Error: {error}</p>}
                {joke && <p className='ai-joke'>Joke: {joke}</p>}
            </div>
        </div>
    );
};

export default Home;