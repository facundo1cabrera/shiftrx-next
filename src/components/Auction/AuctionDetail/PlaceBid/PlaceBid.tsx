"use client"
import { useEffect, useState } from "react"
import { Bid } from "@/models/Bid"
import { signIn, useSession } from "next-auth/react"
import { BidService } from "../../../../services/BidService"
import { AuctionDetail } from "@/models/Auction"
import { LastBidders } from "../LastBidders/LastBidders"
import { Socket, io } from "socket.io-client"
import { Backend_URL } from "@/lib/Constants"

export const PlaceBid = ({ bidsParam, auction, disabled = false }: { bidsParam: Bid[], auction: AuctionDetail, disabled: boolean }) => {
    const { data: session } = useSession();

    const [bids, setBids] = useState<Bid[]>(bidsParam);
    const currentPrice = bids.length > 0 ? bids[bids.length - 1].price : auction.currentPrice;

    const [socket, setSocket] = useState<Socket>();

    const placeSocketBid = (bid: Bid) => {
        if (socket) {
            socket.emit("on-bid-placed", bid);
        }
    }

    const handlePlaceBid = async () => {

        const bidService = new BidService();

        if (!session || !session.user) return;

        const newBid = await bidService.placeBid({
            auctionId: auction.id,
            userId: session?.user.id,
            price: Math.round(currentPrice + currentPrice * 1 / 5),
            accessToken: session.backendTokens.accessToken
        });

        placeSocketBid(newBid);
    }

    const updateBid = (e: Bid) => {
        console.log("receiving socket", e);
        setBids(prevBids => {
            const newBids = [...prevBids, e].sort((a, b) => a.price - b.price);
            return newBids;
        });
    }

    useEffect(() => {
        const newSocket = io(`${Backend_URL}`);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        }
    }, [setSocket]);

    useEffect(() => {
        socket?.on("on-bid-placed", updateBid);

        return () => {
            socket?.off("on-bid-placed", updateBid);
        }
    }, [setBids, socket])

    return (
        <>
            <LastBidders bids={bids} />
            <div className="w-full h-20" > </div>

            {
                session && session.user
                    ? <button
                        disabled={disabled}
                        onClick={handlePlaceBid}
                        className={`${disabled && 'opacity-40'} w-full mb-6 bg-black text-white rounded-md text-2xl py-3`} >
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