export interface Bid {
    id: number,
    auctionId: number,
    price: number,
    time: string,
    bidderName: string,
    userId: number
}

export interface CreateBid {
    auctionId: number,
    price: number,
    userId: number
}