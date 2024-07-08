import { Navbar } from "@/components/Navbar/Navbar";
import { AuctionService } from "@/services/AuctionService";
import { BidService } from "@/services/BidService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import dayjs from "dayjs";
import "dayjs/plugin/relativeTime"
import { LastBidsMade } from "@/components/Dashboard/LastBidsMade/LastBidsMade";

dayjs.extend(require("dayjs/plugin/relativeTime"));

export default async function Dashboard() {

    const auctionService = new AuctionService();
    const bidService = new BidService();

    const session = await getServerSession(authOptions);

    if (!session || !session.backendTokens.accessToken || !session.user) {
        return null;
    }

    const auctions = await auctionService.getAuctionsByUser(session.user.id, session?.backendTokens.accessToken);
    const activeAuctions = auctions.filter(x => dayjs(x.endTime).isAfter(dayjs()));

    const bids = await bidService.getBidsByUserId(session.user.id);

    return (
        <>
            <Navbar />
            <div className="flex flex-col h-full">
                <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="bg-background rounded-lg shadow-md">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-xl font-bold">My Active Auctions</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            {activeAuctions.map((auction) => (
                                <div key={auction.id} className="bg-muted rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium">{auction.title}</h3>
                                        <p className="text-muted-foreground">Current Bid: ${auction.currentPrice.toFixed(2)}</p>
                                        <p className="text-muted-foreground">Time Remaining: {dayjs(auction.endTime).from(dayjs(Date.now()))}</p>
                                    </div>
                                    <div>
                                        <Link
                                            href={`/edit-auction/${auction.id}`}
                                            className="px-4 py-2 rounded-md "
                                            prefetch={false}
                                        >
                                            Edit Auction
                                        </Link>
                                        <Link
                                            href={`/auction/${auction.id}`}
                                            className="px-4 py-2 rounded-md "
                                            prefetch={false}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <LastBidsMade bids={bids} />
                </main>
            </div>
        </>
    );
}
