import Link from 'next/link';
import {unixTimestampToDate, getCachedArticles, slugifyForUri, deslugify} from '../../../utils';
import dotenv from 'dotenv';

dotenv.config();

import Header from '../../../components/header';
import {Fragment} from 'react';
import News from "@/app/components/news";

export default async function Home({params, searchParams}) {
    let articles = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL);
    const {slug} = params;

    if (slug) {
        articles = articles.filter(article => article.tags.find(articleTag => articleTag[0] === 't' && articleTag[1] === slug));
    }

    const categoryTitle = deslugify(slug)

    return (
        <Fragment>
            <Header/>
            <News articles={articles} categoryTitle={categoryTitle} />
        </Fragment>
    );
}
