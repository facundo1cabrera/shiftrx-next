"use client"

import Link from "next/link"
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Drawer } from "./Drawer";

export const Navbar = () => {
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
                <Drawer />
            </div>
        </header>
    )
}