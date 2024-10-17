import Link from "next/link";

export default function NewsCategories() {

    const categories = [
        // {
        //     name: "Announcements",
        //     slug: "announcements"
        // },
        // {
        //     name: "Events",
        //     slug: "events"
        // },
        // {
        //     name: "News",
        //     slug: "news"
        // },
        {
            name: "Nostr",
            slug: "nostr"
        },
        {
            name: "NIPs",
            slug: "nips"
        },
        {
            name: "Funding",
            slug: "funding"
        }
    ];

    return (
        <div className={"hidden sm:block"}>
            <ul className={"space-y-2"}>
                {categories.map((category, index) => {
                        return (
                            <li key={index}>
                                <Link href={`/news/category/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}
