import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t border-border">
            <div className="container py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 grid gap-1">
                <p className="text-center text-sm">All right reserved @textwave</p>
                <div className="text-center text-sm flex items-center justify-center gap-1">
                    <span>Powred By:</span>
                    <Link href="https://rapidapi.com/hub" target="_blank">
                        <Image
                            src="/rapid_api_icon.png"
                            alt="Rapid Api Icon"
                            width={20}
                            height={20}
                            priority
                            className="shrink-0" />
                    </Link>
                    <span>&</span>
                    <Link href="https://vercel.com/docs" target="_blank">
                        <Image
                            src="/vercel_icon.png"
                            alt="Vercel Icon"
                            width={20}
                            height={20}
                            priority
                            className="shrink-0" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;