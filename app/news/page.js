import Link from 'next/link';
import {unixTimestampToDate, getCachedArticles, slugifyForUri} from '../utils';
import dotenv from 'dotenv';

dotenv.config();

import Header from '../components/header';
import {Fragment} from 'react';
import News from "@/app/components/news";

export default async function Home() {
    let articles = await getCachedArticles(process.env.AUTHOR_PUBKEY, process.env.RELAY_URL);

    return (
        <Fragment>
            <Header/>
            <News articles={articles}/>
        </Fragment>
    );
}
