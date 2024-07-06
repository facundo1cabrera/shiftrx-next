import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";


export const Drawer = () => {
    const router = useRouter();

    const { data: session } = useSession();

    const handleLogout = () => {
        router.push('/login');
    }
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content h-full">
                <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer hover:text-gray-800">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <CiUser className="w-full h-full" />

                    </div>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {
                        session && session.user
                            ? (
                                <li>
                                    <Link href={'/api/auth/signout'}>Logout</Link>
                                </li>
                            )
                            : (
                                <li>
                                    <Link href={'/api/auth/signin'}>Log in</Link>
                                </li>
                            )
                    }
                </ul>
            </div>
        </div>
    )
}