import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getServerSession } from "next-auth";

export default async function Navbar() {
    // const session = await getServerSession()
    // if (!session) return
    // const { user } = session
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
                <span className="flex-grow" />
                <Avatar>
                    <AvatarImage
                        // src={user.image}
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        referrerPolicy="no-referrer"
                    />
                </Avatar>
            </div>
        </div>
    )
}

const links = [
    { href: "/", label: "Home" },
    { href: "/track", label: "Track"}
]