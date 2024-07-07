"use client"
import { useState } from "react"
import { Bid } from "@/models/Bid"
import { LastBidders } from "../LastBidders/LastBidders"
import { signIn, useSession } from "next-auth/react"
import { BidService } from "@/services/BidService"

export const PlaceBid = ({ bidsParam, auctionId, startingPrice }: { bidsParam: Bid[], auctionId: number, startingPrice: number }) => {

    const { data: session } = useSession();

    const [bids, setBids] = useState<Bid[]>(bidsParam);
    const currentPrice = bids.length > 0 ? bids[bids.length - 1].price : startingPrice;

    const handlePlaceBid = async () => {

        const bidService = new BidService();

        if (!session || !session.user) return;

        const newBid = await bidService.placeBid({
            auctionId, 
            userId: session?.user.id, 
            price: Math.round(currentPrice + currentPrice * 1 / 5),
            accessToken: session.backendTokens.accessToken
        });

        setBids([...bids, {...newBid}])
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
                        Place bid for ${Math.round(currentPrice + currentPrice * 1 / 5).toFixed(2)}
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