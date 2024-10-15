import Link from "next/link";

export default function BackToNewsLink() {
    return (
        <p className={"py-4"}>
            <Link href={"/news"}>← Back to News</Link>
        </p>
    );
}
