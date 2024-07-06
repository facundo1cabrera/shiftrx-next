"use client"
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Auction } from "@/models/Auction";


export const AuctionCard = ({ auction }: { auction: Auction }) => {
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        router.push(`/auction/${auction.id}`)
    }
    return (
        <div
            className="overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={(e) => handleClick(e)}
        >
            <Link href="#" className="" prefetch={false}>
                <span className="sr-only">View Auction</span>
            </Link>

            <div className="bg-black bg-opacity-50 ">
                <img
                    src={auction.image}
                    alt={auction.title}
                    width={500}
                    height={400}
                    className="object-cover w-full h-64"
                />
            </div>

            <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">{auction.title}</h3>
                <p className="text-sm text-muted-foreground">{auction.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-semibold">${auction.currentPrice.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground text-red-800">{auction.timeRemaining}</div>
                </div>
            </div>
        </div>
    );
}