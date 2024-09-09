import Header from '@/app/components/header';
import {Fragment} from 'react';
import ReactMarkdown from 'react-markdown';
import {unixTimestampToDate, getCachedArticles, slugifyForUri} from '@/app/utils';
import { Metadata, ResolvingMetadata } from "next";
import dotenv from 'dotenv';
import Link from "next/link";
import NewsCategories from "@/app/components/news-categories";
import BackToNewsLink from "@/app/components/back-to-news-link";
import OtherClientsLink from "@/app/components/other-clients-link";

dotenv.config();

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    const articles = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)

    const article = articles.find(article => slugifyForUri(article.tags.find(tag => tag[0] === 'title')[1]) === id);
    const articleTitle = article.tags.find(tag => tag[0] === 'title')[1];
    const image = article.tags.find(tag => tag[0] === 'image') && article.tags.find(tag => tag[0] === 'image')[1];
    const summary = article.tags.find(tag => tag[0] === 'summary') && article.tags.find(tag => tag[0] === 'summary')[1];

    return {
        title: articleTitle + ' | Nostriot News',
        description: summary ? summary : null,
        ogImage: image ? image : null,
    }
}

export default async function Article({params}) {
    const {id} = params;
    const articles = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL)
    // get article from articles where slugifyForUri of the article title matches id
    const article = articles.find(article => slugifyForUri(article.tags.find(tag => tag[0] === 'title')[1]) === id);

    if (!article) {
        return <p>Article not found</p>;
    }

    const articleTitle = article.tags.find(tag => tag[0] === 'title')[1];
    const image = article.tags.find(tag => tag[0] === 'image') && article.tags.find(tag => tag[0] === 'image')[1];
    const tags = article.tags.filter(tag => tag[0] === 't').map(tag => tag[1])


    return (
        <Fragment>
            <Header/>
            <div className="container mx-auto p-4">
                <div className="prose space-y-2 pb-8 pt-6">
                    <h1 className="text-4xl font-bold">
                        Nostriot News
                    </h1>
                </div>

                <div className={"grid grid-cols-4 gap-4"}>
                    <NewsCategories/>
                    <div className={"col-span-3"}>
                        <BackToNewsLink/>
                        {image && (
                            <img
                                src={image}
                                alt={articleTitle}
                                className="w-full aspect-video max-h-64 object-cover mb-4"
                            />
                        )}
                        <div className="p-4">
                            <h1 className="text-3xl font-bold mb-0">
                                {articleTitle}
                            </h1>
                            <OtherClientsLink article={article}/>
                            {tags && (
                                <div className="pr-8 py-4">
                                    {tags.map((tag, index) => (
                                        <Link key={index}
                                              className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded mr-2"
                                              href={`/news/category/${slugifyForUri(tag)}`}
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <p className="text-gray-500 text-sm mb-4">
                                Published {unixTimestampToDate(article.created_at)}
                            </p>
                            <div className="prose">
                                {!article.content && article.tags.find(tag => tag[0] === 'summary') && (
                                    <ReactMarkdown>
                                        {article.tags.find(tag => tag[0] === 'summary')[1]}
                                    </ReactMarkdown>
                                )}
                                {article.content && (
                                    <ReactMarkdown>
                                        {article.content}
                                    </ReactMarkdown>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
