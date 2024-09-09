import Link from "next/link";

export default function BackToNewsLink() {
    return (
        <p className={"p-4 pt-4"}>
            <Link className={"text-blue-700 "} href={"/news"}>← Back to News</Link>
        </p>
    );
}
