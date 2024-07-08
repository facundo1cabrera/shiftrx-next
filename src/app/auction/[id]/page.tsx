import { PlaceBid } from "@/components/Auction/AuctionDetail/PlaceBid/PlaceBid";
import { Countdown } from "@/components/Countdown/Countdown";
import { Navbar } from "@/components/Navbar/Navbar";
import { AuctionService } from "@/services/AuctionService";
import dayjs from "dayjs";

export const dynamic = 'force-dynamic'

export default async function AuctionDetail({ params }: { params: { id: string } }) {

    const auctionService = new AuctionService();
    const auction = await auctionService.getAuctionDetail(parseInt(params.id));

    return (
        <>
            <div className="min-h-screen sm:overflow-hidden">
                <Navbar />
                <div className="w-full h-full flex flex-col items-center justify-center pt-12">
                    {
                        dayjs().isAfter(dayjs(auction.endTime)) &&
                        <div
                            className="w-full text-red-800 text-2xl font-medium flex justify-center items-center h-20"
                        >
                            This auction has expired!
                        </div>
                    }
                    <div className="w-full h-4/5    flex flex-col sm:flex-row justify-center md:w-4/5 xl:w-3/5 bg-card rounded-lg shadow-lg">
                        <div className="w-full md:w-1/2 p-4 pt-10 flex flex-col">
                            <h1 className="text-5xl font-bold">{auction.title}</h1>
                            <p className="text-xl my-4 break-words">{auction.description}</p>
                            <p className="text-xl mb-2 font-medium">Last 5 bids:</p>

                            <PlaceBid bidsParam={auction.bids} auction={auction} disabled={dayjs().isAfter(dayjs(auction.endTime)) } />
                        </div>
                        <div
                            className="inline-block h-full w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center sm:items-end">
                            <div className="pl-8 pr-12 pb-6">
                                <Countdown targetDate={auction.endTime} />
                            </div>

                            <img
                                src={auction.image}
                                alt="Product Image"
                                className="rounded-lg object-cover w-full aspect-[4/3]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
