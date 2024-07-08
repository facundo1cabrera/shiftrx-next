"use client"
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuctionHome } from "@/models/Auction";
import dayjs from "dayjs";


export const AuctionCard = ({ auction }: { auction: AuctionHome }) => {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        router.push(`/auction/${auction.id}`)
    }
    return (
        <div
            className="flex flex-col justify-between rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
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
                <p className="text-sm break-words">{auction.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4 px-4 pt-4">
                <div className="text-lg font-semibold">${auction.currentPrice.toFixed(2)}</div>
                {
                    dayjs().isBefore(dayjs(auction.endTime))
                        ? <div className="text-sm">Ends at {dayjs(auction.endTime).format("HH:mm")}</div>
                        : <div className="text-sm text-red-800">Ended at {dayjs(auction.endTime).format("DD/MM HH:mm")}</div>
                }
            </div>

            <div className="w-full p-4">
                <button
                    onClick={(e) => handleClick(e)}
                    className="w-full bg-black text-white py-2 hover:opacity-85">
                    View Auction
                </button>
            </div>
        </div>
    );
}