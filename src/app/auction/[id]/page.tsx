import { PlaceBid } from "@/components/Auction/AuctionDetail/PlaceBid/PlaceBid";
import { Countdown } from "@/components/Countdown/Countdown";
import { Navbar } from "@/components/Navbar/Navbar";
import { AuctionService } from "@/services/AuctionService";

export default async function AuctionDetail({ params }: { params: { id: string } }) {

    const auctionService = new AuctionService();
    const auction = await auctionService.getAuctionDetail(parseInt(params.id));

    return (
        <>
            <div className="min-h-screen sm:overflow-hidden">
                <Navbar />
                <div className="w-full h-full flex justify-center pt-12">
                    <div className="w-full h-4/5 flex flex-col sm:flex-row justify-center md:w-4/5 xl:w-3/5 bg-card rounded-lg shadow-lg">
                        <div className="w-full md:w-1/2 p-4 pt-10 flex flex-col">
                            <h1 className="text-5xl font-bold">{auction.title}</h1>
                            <p className="text-xl my-4 text-justify">{auction.description}</p>
                            <p className="text-xl mb-2 font-medium">Last 5 bids:</p>
                            <PlaceBid bidsParam={auction.bids} auctionId={auction.id} startingPrice={auction.currentPrice}/>
                        </div>
                        <div
                            className="inline-block h-full w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center sm:items-end">
                            <div className="pl-8 pr-12 pb-6">
                                <Countdown targetDate={new Date(Date.now() + 60 * 1000 * 2).toISOString()} />
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
