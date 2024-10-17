// define a component with a prop for articles
import Link from "next/link";
import {slugifyForUri, unixTimestampToDate} from "@/app/utils";

export default function NewsList({articles}) {
    return (
        <section className="space-y-3">
            {articles && articles.map((article, index) => {
                const articleTitle = article.tags.find(tag => tag[0] === 'title')[1];
                const articleSummary = article.tags.find(tag => tag[0] === 'summary') && article.tags.find(tag => tag[0] === 'summary')[1];
                return (
                    <div key={index} className="pb-5">
                        <Link href={`/news/${slugifyForUri(articleTitle)}`}
                              className="flex">
                            <div className={"prose dark:prose-invert"}>
                                <p className="text-sm mb-0">
                                    {unixTimestampToDate(article.created_at)}
                                </p>
                                <h2 className={"mt-0 mb-2 underline"}>{articleTitle}</h2>
                                {articleSummary && (
                                    <p>{articleSummary}</p>
                                )}
                            </div>
                        </Link>
                    </div>
                )
            })}
            {/*    if no articles */}
            {!articles.length && (
                <p className={"prose dark:prose-invert"}>There are no articles in this category yet.</p>
            )}
        </section>
    );
}
