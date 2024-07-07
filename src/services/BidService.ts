import { Backend_URL } from "@/lib/Constants";
import axios from "axios";


export class BidService {
    async placeBid({ auctionId, userId, price, accessToken }: {
        auctionId: number,
        userId: number,
        price: number,
        accessToken: string
    }) {
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
    }

    async getBids(auctionId: number) {
        const result = await axios.get(`${Backend_URL}/bid/byAuction/${auctionId}`);

        return result.data;
    }
}