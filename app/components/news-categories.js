import Link from "next/link";

export default function NewsCategories() {

    const categories = [
        {
            name: "Announcements",
            slug: "announcements"
        },
        {
            name: "Events",
            slug: "events"
        },
        {
            name: "News",
            slug: "news"
        },
        {
            name: "Nostr",
            slug: "nostr"
        }
    ];

    return (
        <div>
            {/*   show each categories link with a nice tailwind styled list */}
            <ul className={"space-y-2"}>
                {categories.map((category, index) => {
                        return (
                            <li key={index}>
                                <Link href={`/news/category/${category.slug}`} className={"text-blue-500 hover:underline"}>
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
