'use client';

import {Fragment, useState} from 'react';
import {naddrEncode} from "nostr-tools/nip19";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import dotenv from 'dotenv';

dotenv.config();

export default function ToggleDiv({article}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDiv = () => {
        setIsVisible((prev) => !prev);
    };

    const [copied, setCopied] = useState(false);

    const articleDTag = article.tags.find(tag => tag[0] === 'd')[1]

    let articleEntity;
    try {
        console.log('articleDTag:', articleDTag)
        // log .env vars
        console.log('process.env.AUTHOR_PUBKEY:', process.env.NEXT_PUBLIC_RELAY_URL)
        if (articleDTag) {
            let relays = [process.env.NEXT_PUBLIC_RELAY_URL]

            articleEntity = naddrEncode({
                pubkey: process.env.NEXT_PUBLIC_AUTHOR_PUBKEY,
                relays: relays,
                kind: 30023,
                identifier: articleDTag
            });
        }
    } catch (error) {
        console.error('Error encoding eventId:', error);
    }

    return (
        <div className={"my-2"}>
            <button onClick={toggleDiv} className="rounded px-3 py-1 bg-black rounded-2xl text-white">
                Read this in another Nostr client
            </button>

            {isVisible && (
                <div className="mt-4 p-3 border rounded md:w-1/2">
                    <p className="mb-2">
                        <a href={`https://highlighter.com/a/${articleEntity}`} target="_blank" rel="noreferrer"
                           className={"underline"}
                        >
                            Read on Highlighter
                        </a>
                    </p>
                    <p className="mb-2">
                        <a href={`https://yakihonne.com/article/${articleEntity}`} target="_blank" rel="noreferrer"
                           className={"underline"}
                        >
                            Read on Yakihonne
                        </a>
                    </p>
                    <p className="mb-4">
                        <a href={`https://habla.news/a/${articleEntity}`} target="_blank" rel="noreferrer"
                           className={"underline"}
                        >
                            Read on Habla.news
                        </a>
                    </p>
                    {articleEntity && (
                        <Fragment>
                            <div className="flex items-center ">
                                <input
                                    type="text"
                                    value={articleEntity}
                                    onClick={(e) => {
                                        e.target.select();
                                        document.execCommand('copy');
                                        setCopied(true);
                                        setTimeout(() => {
                                            setCopied(false);
                                        }, 1000)
                                    }
                                    }
                                    readOnly
                                    className="p-2 mt-2 w-64 bg-gray-100 rounded block mr-2"
                                />
                                {/* a clipboard icon */}
                                <svg fill="#000000" width="24px" height="24px" viewBox="0 0 36 36" version="1.1"
                                     preserveAspectRatio="xMidYMid meet">
                                    <path
                                        d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"
                                        className="clr-i-outline clr-i-outline-path-1"></path>
                                    <path
                                        d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"
                                        className="clr-i-outline clr-i-outline-path-2"></path>
                                    <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"
                                          className="clr-i-outline clr-i-outline-path-3"></path>
                                    <path
                                        d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"
                                        className="clr-i-outline clr-i-outline-path-4"></path>
                                    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                                </svg>
                            </div>
                            {copied && (
                                <div className="text-sm text-green-500 pt-1">Copied!</div>
                            )}
                        </Fragment>
                    )}


                </div>
            )}
        </div>
    );
}
