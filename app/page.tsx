import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Memes {
    name: string;
    url: string;
    id: string;
    box_count: number;
}

const Meme = async () => {
    const data = await fetch('https://api.imgflip.com/get_memes')
    const res = await data.json();
    const meme = await res.data.memes;

    return (
        <>
            <div>
                <div>
                    <div>
                        <h1>Memes</h1>
                    </div>

                    <div>
                        {meme.map((item: Memes) => (
                            <div key={item.id}>
                                <Image
                                    src={item.url}
                                    alt="meme"
                                    width={200}
                                    height={200}
                                />
                                <div>
                                    <p>{item.name}</p>
                                    <div>
                                        <Link href={{
                                            pathname: "generateMeme",
                                            query: {
                                                urls: item.url,
                                                id: item.id,
                                                box_count: item.box_count
                                            }
                                        }}>
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

export default Meme;
