"use client"
import { useState } from "react"
import { Bid } from "@/models/Bid"
import { LastBidders } from "../LastBidders/LastBidders"
import { signIn, useSession } from "next-auth/react"

export const PlaceBid = ({ bidsParam, auctionId }: { bidsParam: Bid[], auctionId: number }) => {

    const { data: session } = useSession();

    const [bids, setBids] = useState(bidsParam);
    const currentPrice = bids[bids.length - 1].price;

    const handlePlaceBid = () => {
        // call auction service to create a new bid an get its id

        setBids([...bids, {
            id: 34,
            bidder: session?.user.name || '',
            auctionId,
            price: currentPrice + currentPrice * 1 / 5,
            time: Date.now()
        }])
    }

    return (
        <>
            <LastBidders bids={bids} />
            <div className="w-full h-20" > </div>

            {
                session && session.user
                    ? <button
                        onClick={handlePlaceBid}
                        className="w-full mb-6 bg-black text-white rounded-md text-2xl py-3" >
                        Place bid for ${currentPrice.toFixed(2)}
                    </button>
                    : <button
                        onClick={() => signIn()}
                        className="w-full mb-6 opacity-40 bg-black text-white rounded-md text-2xl py-3"
                    >
                        Log in to place bid
                    </button>
            }

        </>
    )
}