import NewsCategories from "@/app/components/news-categories";
import NewsList from "@/app/components/news-list";
import Link from "next/link";
import BackToNewsLink from "@/app/components/back-to-news-link";
import {Fragment} from "react";

export default function News({articles, categoryTitle}) {
    return (
        <div className="container mx-auto p-4">
            <div className="prose space-y-2 pb-8 pt-6">
                <h1 className="text-4xl font-bold">
                    Nostriot News
                </h1>
            </div>

            <div className={"grid sm:grid-cols-4 gap-4"}>
                <NewsCategories/>
                <div className={"col-span-3"}>
                    {categoryTitle && (
                        <Fragment>
                            <BackToNewsLink/>

                            <h2 className={"text-2xl py-3 mb-0"}>
                                {categoryTitle}
                            </h2>
                        </Fragment>
                    )}
                    <NewsList articles={articles}/>
                </div>

            </div>
        </div>
    );
}
