"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
    const [search, setSearch] = useState("");

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSearch(event.currentTarget.value)
    }

    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    }

    return (
        <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link href="/" className="font-bold" prefetch={true}>
                    Auctions
                </Link>
                <Link href="/dashboard" className="text-gray-500 dark:text-gray-400" prefetch={true}>
                    Dashboard
                </Link>
            </nav>
            <div className="flex items-center">
                <div className="flex-1 ml-auto sm:flex-initial pr-4">
                    <div className="relative">
                        <FaSearch className={`${search.length > 0 ? 'hidden' : ''} absolute
                            top-1/2 left-4 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400`} />
                        <input
                            placeholder="Search interviews..."
                            className={` ${search.length > 0 ? 'pl-4' : 'pl-14'} border py-3 sm:w-[300px] md:w-[200px] lg:w-[300px]`}
                            onKeyDown={handleKeyDown}
                            onChange={handleSearch}
                            value={search}
                        />
                    </div>
                </div>
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
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}