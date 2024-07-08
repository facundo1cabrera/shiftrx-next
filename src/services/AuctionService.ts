import { Backend_URL } from "@/lib/Constants";
import { AuctionHome, AuctionDetail, GetAllAuctionsResponse, GetAuctionDetailResponse } from "@/models/Auction";
import axios from "axios";

export class AuctionService {
    async getAllAuctions(): Promise<AuctionHome[]> {
        const result = await axios.get<GetAllAuctionsResponse[]>(`${Backend_URL}/auction`)

        return result.data;
    }

    async getAuctionDetail(id: number): Promise<AuctionDetail> {
        const result = await axios.get<GetAuctionDetailResponse>(`${Backend_URL}/auction/${id}`)

        return result.data;
    }

    async getAuctionsByUser(userId: number, token: string): Promise<GetAllAuctionsResponse[]> {
        const result = await axios.get<GetAllAuctionsResponse[]>(`${Backend_URL}/auction/byUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return result.data;
    }

    async updateAuction({
        auctionId,
        image,
        title,
        description,
        accessToken
    }: {
        auctionId: number,
        image: string,
        title: string,
        description: string,
        accessToken: string
    }) {
        const result = await axios.put(`${Backend_URL}/auction/${auctionId}`, {
            image,
            title,
            description
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return result.data
    }

    async createAuction({
        accessToken,
        userId,
        image,
        title,
        description,
        startingPrice,
        endTime
    }: {
        accessToken: string,
        userId: number,
        image: string,
        title: string,
        description: string,
        startingPrice: number,
        endTime: string
    }) {
        const result = await axios.post(`${Backend_URL}/auction`, {
            image,
            title,
            description,
            userId,
            startingPrice,
            endTime
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return result.data
    }
}