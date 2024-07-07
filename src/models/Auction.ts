import { Bid } from "./Bid";

export interface AuctionDetail {
    id: number;
    image: string;
    title: string;
    description: string;
    currentPrice: number;
    endTime: string;
    bids: Bid[];
};

export interface GetAllAuctionsResponse {
    id: number,
    image: string,
    title: string,
    description: string,
    currentPrice: number,
    startingPrice: number,
    createdAt: string,
    updatedAt: string,
    endTime: string,
    userId: number
}

export interface GetAuctionDetailResponse {
    id: number,
    image: string,
    title: string,
    description: string,
    currentPrice: number,
    startingPrice: number,
    createdAt: string,
    updatedAt: string,
    endTime: string,
    userId: number
    bids: Bid[]
}

export interface AuctionHome {
    id: number,
    title: string,
    description: string,
    currentPrice: number,
    endTime: string,
    image: string
}