import Link from "next/link";
import { getServerSession } from "next-auth";
import { Avatar } from "../Avatar";
import { getUserSession } from "@/lib/auth";

export async function Navbar() {
    const user = await getUserSession()
    return (
        <div className="shadow py-3">
            <div className="container mx-auto flex items-center space-x-4">
                <Link href="/" className="px-2 hover:bg-zinc-100">
                    <span className="font-semibold">Time tracker</span>
                </Link>
                <nav>
                    <ul>
                        {
                            links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link className="py-1 px-2 hover:bg-zinc-100 text-blue-500 hover:text-blue-600" href={href}>
                                        {label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                {/* <Link href="/signout" className="px-2 hover:bg-zinc-100">
                    <span className="font-semibold" onClick={() => signOut()}>Sign out</span>
                </Link> */}
                <span className="flex-grow" />
                <Avatar user={user}/>
            </div>
        </div>
    )
}

const links = [
    { href: "/", label: "Home" },
    { href: "/track", label: "Track"}
]