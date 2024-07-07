import { Bid } from "@/models/Bid"
import dayjs from "dayjs"

export const LastBidders = ({ bids }: { bids: Bid[] }) => {
    bids = bids.slice(-5)
    return (
        <>
            {
                bids.map(x => (
                    <div className="w-full flex justify-between items-center">
                        <p className="text-lg font-semibold ">${x.price.toFixed(2)}</p>
                        <p>{x.bidder} - {dayjs(x.time).format('HH:mm')}hs</p>
                    </div>
                ))
            }
        </>
    )
}