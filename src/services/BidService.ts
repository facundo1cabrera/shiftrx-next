import { Backend_URL } from "@/lib/Constants";
import { Bid, BidWithAuctionTitle } from "@/models/Bid";
import axios from "axios";


export class BidService {
    async placeBid({ auctionId, userId, price, accessToken }: {
        auctionId: number,
        userId: number,
        price: number,
        accessToken: string
    }) {
        try {
            const result = await axios.post(`${Backend_URL}/bid`, {
                price,
                userId,
                auctionId
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return result.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getBids(auctionId: number) {
        try {
            const result = await axios.get(`${Backend_URL}/bid/byAuction/${auctionId}`);

            return result.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getBidsByUserId(userId: number) {
        try {
            const result = await axios.get<BidWithAuctionTitle[]>(`${Backend_URL}/bid/byUser/${userId}`);

            return result.data
        } catch (e) {
            console.log(e);
            return []
        }
    }
}