import { Bid } from "./Bid";

export interface AuctionDetail {
    id: number;
    image: string;
    title: string;
    description: string;
    currentPrice: number;
    timeRemaining: string;
    shortDescription: string;
    bids: Bid[];
};