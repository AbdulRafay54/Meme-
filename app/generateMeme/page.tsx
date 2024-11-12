"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface MemeProps {
    name: string;
    id: string;
    urls: string;
    box_count: number;
}

const CreateMeme = ({ searchParams }: { searchParams: MemeProps }) => {
    const [generatedMemeImage, setGeneratedMemeImage] = useState<string | null>(null);
    const [inputTexts, setInputTexts] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (index: number, value: string) => {
        setInputTexts(prev => ({ ...prev, [`text_${index}`]: value }));
    };

    const generateMeme = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const params = Object.keys(inputTexts)
            .map((key, i) => `boxes[${i}][text]=${encodeURIComponent(inputTexts[key])}`)
            .join('&');

        const url = `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=AbdulRafay9&password=Rafay12345@&${params}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.success) {
                setGeneratedMemeImage(data.data.url);
                setInputTexts({});
            } else {
                alert('Error: ' + data.error_message);
            }
        } catch (error) {
            alert('Error: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=' bg-gray-900 min-h-screen p-8 flex justify-center gap-12 flex-wrap'>
            {/* Meme Creation Form */}
            <div className="max-w-md p-6 bg-gray-800 shadow-lg rounded-lg mt-6">
                <h1 className="mt-6 text-3xl font-bold mb-10 text-white text-center">
                    Create Your Meme 😅
                </h1>
                <div className="flex justify-center mb-6">
                    <Image
                        src={searchParams.urls}
                        width={500}
                        height={300}
                        alt="meme"
                        className="rounded-lg shadow-md object-contain"
                    />
                </div>
                <form onSubmit={generateMeme} className="space-y-4">
                    {Array.from({ length: searchParams.box_count }).map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            value={inputTexts[`text_${i}`] || ''}
                            onChange={(e) => handleInputChange(i, e.target.value)}
                            placeholder={`Meme text ${i + 1}`}
                            className="w-full px-4 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-200 text-gray-700"
                        />
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-white font-bold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform"
                    >
                        {loading ? 'Generating...' : 'Generate Meme'}
                    </button>
                </form>
            </div>
   
            {/* Generated Meme Display */}
            <div className="max-w-md w-[488px] p-6 bg-gray-800 shadow-lg rounded-lg mt-6">
                <h1 className="mt-6 text-3xl font-bold mb-10 text-white text-center">Your Generated Meme 😂</h1>
                {generatedMemeImage ? (
                    <div className="flex justify-center mt-4">
                        <Image
                            src={generatedMemeImage}
                            alt="Generated Meme"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-contain"
                        />
                    </div>
                ) : (
                    <h1 className="mt-4 text-xl font-semibold text-red-400 text-center">
                        No Meme Generated...
                    </h1>
                )}
            </div>
        </div>
    )
}

export default CreateMeme;
