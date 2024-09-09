import Link from 'next/link';

export default function Header() {
    const siteTitle = process.env.SITE_TITLE;

    return (
        <header className="text-white p-4"  style={{backgroundColor: '#0F0F12'}}>
            <div className="container mx-auto flex items-center">
                {/*<h1 className="text-2xl font-bold mr-8">{siteTitle}</h1>*/}
                <Link href="/" className="text-white mr-6">
                    Home
                </Link>
                <Link href="/news" className="text-white mr-6">
                    News
                </Link>
            </div>
        </header>
    );
}
