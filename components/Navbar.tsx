import Link from "next/link";

import { GithubIcon, ActivitySquareIcon } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="z-10 fixed top-0 w-full bg-background/50 backdrop-blur-2xl border-b border-border">
            <div className="container py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <ActivitySquareIcon size={20} className="text-orange-500"/>
                    <span className="text-xl font-bold">Text Wave</span>
                </Link>
                <Link href="https://github.com/robiuzzaman4/text-wave" target="_blank">
                    <GithubIcon size={20} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;