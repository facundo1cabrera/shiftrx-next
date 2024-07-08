export interface Bid {
    id: number,
    auctionId: number,
    price: number,
    time: string,
    bidderName: string,
    userId: number
}

export interface BidWithAuctionTitle extends Bid {
    title: string;
}

export interface CreateBid {
    auctionId: number,
    price: number,
    userId: number
}