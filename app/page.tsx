import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface Memes {
    name: string;
    url: string;
    id: string;
    box_count: number;
}

const Meme = async () => {

    const data = await fetch('https://api.imgflip.com/get_memes')
    const res = await data.json()
    console.log(res.data);
    const meme = await res.data.memes
    console.log(meme);

    return (
        <>
            <div className='bg-gray-900 min-h-screen'>
                <div className="container mx-auto p-4 pb-10">

                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-200">Memes 😂</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {meme.map((item: Memes) => (
                            <div key={item.id} className="border border-gray-700 rounded-lg shadow-xl overflow-hidden bg-gray-800 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300">
                                <Image
                                    src={item.url}
                                    alt="meme"
                                    width={300}
                                    height={200}
                                    className="w-full h-56 object-cover rounded-t-lg"
                                />
                                <div className="p-4 text-center">
                                    <p className="text-lg font-semibold text-gray-300">{item.name}</p>
                                    <div className='mt-4'>
                                        <Link href={{
                                            pathname: "generateMeme",
                                            query: {
                                                urls: item.url,
                                                id: item.id,
                                                box_count: item.box_count
                                            }
                                        }} className="mt-2 inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-6 w-full rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 transform">
                                            Generate Meme
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Meme
