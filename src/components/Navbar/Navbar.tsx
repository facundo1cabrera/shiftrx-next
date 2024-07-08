"use client"

import Link from "next/link"
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Drawer } from "./Drawer";

export const Navbar = () => {
    const [search, setSearch] = useState("");

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setSearch(event.currentTarget.value)
    }




    return (
        <header className="flex flex-col sm:flex-row items-center justify-between sm:h-16 px-2 sm:px-4 border-b md:px-6">
            <nav className="flex flex-col py-4 sm:py-0 sm:flex-row items-center gap-6">
                <Link href="/" className="font-bold" prefetch={true}>
                    Auctions
                </Link>
                <Link href="/dashboard" className="text-gray-500 dark:text-gray-400" prefetch={true}>
                    Dashboard
                </Link>
                <Link href="/create-auction" className="text-gray-500 dark:text-gray-400" prefetch={true}>
                    Create an auction
                </Link>
            </nav>
            <div className="flex items-center">
                <div className="flex-1 ml-auto sm:flex-initial pr-4">
                    <div className="relative">
                        <FaSearch className={`${search.length > 0 ? 'hidden' : ''} absolute
                            top-1/2 left-4 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400`} />
                        <input
                            placeholder="Search auction..."
                            className={` ${search.length > 0 ? 'pl-4' : 'pl-14'} border py-3 sm:w-[300px] md:w-[200px] lg:w-[300px]`}
                            onKeyDown={handleKeyDown}
                            onChange={handleSearch}
                            value={search}
                        />
                    </div>
                </div>
                <Drawer />
            </div>
        </header>
    )
}