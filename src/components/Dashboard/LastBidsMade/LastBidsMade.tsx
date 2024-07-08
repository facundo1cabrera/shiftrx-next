import { AuctionHome } from "@/models/Auction"
import { BidWithAuctionTitle } from "@/models/Bid"
import dayjs from "dayjs"
import Link from "next/link"

export const LastBidsMade = ({ bids }: { bids: BidWithAuctionTitle[] }) => {

    return (
        <div className="bg-background rounded-lg shadow-md">
            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">Last 10 Bids made</h2>
            </div>
            <div className="p-4 space-y-4">
                {bids.sort((a, b) => dayjs(a.time).isAfter(dayjs(b.time)) ? -1 : 1).slice(0, 10).map((bid) => (
                    <div key={bid.id} className="bg-muted rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium">{bid.title}</h3>
                            <p className="text-muted-foreground">Amount: ${bid.price.toFixed(2)}</p>
                            <p className="text-muted-foreground">Time Remaining: {dayjs(bid.time).from(dayjs(Date.now()))}</p>
                        </div>
                        <div>
                            <Link
                                href={`/auction/${bid.auctionId}`}
                                className="px-4 py-2 rounded-md "
                                prefetch={false}
                            >
                                View Auction
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}