import { AuctionDetail } from "@/models/AuctionDetail";
import { AuctionHome } from "@/models/AuctionHome";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const bids = [
    {
        id: 1,
        auctionId: 1,
        price: 320.0,
        time: Date.now() - 1000 * 60 * 5,
        bidder: "Matt turner"
    },
    {
        id: 2,
        auctionId: 1,
        price: 360.0,
        time: Date.now() - 1000 * 60 * 4,
        bidder: "Matt turner"
    },
    {
        id: 3,
        auctionId: 1,
        price: 400.0,
        time: Date.now() - 1000 * 60 * 2,
        bidder: "Josephine Clark"
    }
]

const auctions = [
    {
        id: 1,
        image: "/1.webp",
        title: "Vintage Leather Armchair",
        shortDescription: "Beautifully crafted leather armchair from the 1950s",
        description: "This beautifully crafted leather armchair from the 1950s offers a blend of vintage charm and modern comfort, making it a perfect addition to any living space. It features rich, supple leather and a sturdy frame.",
        currentPrice: 450.99,
        timeRemaining: "2 days 12 hours",
        bids
    },
    {
        id: 2,
        image: "/2.webp",
        title: "Antique Persian Rug",
        shortDescription: "Handwoven rug from the 19th century, in excellent condition",
        description: "This handwoven Persian rug from the 19th century is in excellent condition, showcasing intricate patterns and vibrant colors that are sure to enhance the aesthetic of any room. It's a timeless piece of art.",
        currentPrice: 1200.0,
        timeRemaining: "5 days 6 hours",
        bids: []
    },
    {
        id: 3,
        image: "/3.webp",
        title: "Rare Vinyl Record Collection",
        shortDescription: "Curated collection of 50 rare and out-of-print vinyl records",
        description: "This curated collection of 50 rare and out-of-print vinyl records is a treasure trove for music enthusiasts and collectors alike, offering a diverse selection of timeless classics and hidde ems.",
        currentPrice: 750.75,
        timeRemaining: "1 day 18 hours",
        bids: []
    },
    {
        id: 4,
        image: "/4.webp",
        title: "Vintage Typewriter",
        shortDescription: "Fully functional 1940s typewriter in pristine condition",
        description: "This fully functional typewriter from the 1940s is in pristine condition, perfect for collectors and vintage enthusiasts. It boasts a robust construction and smooth typing action, preserving the essence of a bygone era.",
        currentPrice: 325.0,
        timeRemaining: "3 days 9 hours",
        bids: []
    },
    {
        id: 5,
        image: "/5.webp",
        title: "Antique Pocket Watch",
        shortDescription: "Beautifully engraved pocket watch from the late 1800s",
        description: "This beautifully engraved pocket watch from the late 1800s is a testament to exquisite craftsmanship and timeless design. It features intricate detailing and is fully functional, making it a prized possession for any collector.",
        currentPrice: 550.0,
        timeRemaining: "4 days 2 hours",
        bids: []
    },
    {
        id: 6,
        image: "/6.webp",
        title: "Vintage Camera Collection",
        shortDescription: "Set of 5 rare and collectible vintage cameras",
        description: "This set of 5 rare and collectible vintage cameras offers a glimpse into the history of photography. Each camera in the collection is unique and in good working condition, perfect for enthusiasts and collectors.",
        currentPrice: 900.0,
        timeRemaining: "2 days 15 hours",
        bids: []
    },
    {
        id: 7,
        image: "/7.webp",
        title: "Rare Vinyl Record Collection",
        shortDescription: "Curated collection of 50 rare and out-of-print vinyl records",
        description: "This curated collection of 50 rare and out-of-print vinyl records is a treasure trove for music enthusiasts and collectors alike, offering a diverse selection of timeless classics and hidde ems.",
        currentPrice: 750.75,
        timeRemaining: "1 day 18 hours",
        bids: []
    },
    {
        id: 8,
        image: "/8.webp",
        title: "Vintage Typewriter",
        shortDescription: "Fully functional 1940s typewriter in pristine condition",
        description: "This fully functional typewriter from the 1940s is in pristine condition, perfect for collectors and vintage enthusiasts. It boasts a robust construction and smooth typing action, preserving the essence of a bygone era.",
        currentPrice: 325.0,
        timeRemaining: "3 days 9 hours",
        bids: []
    },
    {
        id: 9,
        image: "/4.webp",
        title: "Vintage Typewriter",
        shortDescription: "Fully functional 1940s typewriter in pristine condition",
        description: "This fully functional typewriter from the 1940s is in pristine condition, perfect for collectors and vintage enthusiasts. It boasts a robust construction and smooth typing action, preserving the essence of a bygone era.",
        currentPrice: 325.0,
        timeRemaining: "3 days 9 hours",
        bids: []
    },
    {
        id: 10,
        image: "/1.webp",
        title: "Antique Pocket Watch",
        shortDescription: "Beautifully engraved pocket watch from the late 1800s",
        description: "This beautifully engraved pocket watch from the late 1800s is a testament to exquisite craftsmanship and timeless design. It features intricate detailing and is fully functional, making it a prized possession for any collector.",
        currentPrice: 550.0,
        timeRemaining: "4 days 2 hours",
        bids: []
    },
];


export class AuctionService {
    async getAllAuctions(): Promise<AuctionHome[]> {
        await delay(200);

        return auctions;
    }

    async getAuctionDetail(id: number): Promise<AuctionDetail> {
        await delay(200);

        return auctions.find(x => x.id === id) as AuctionDetail;
    }

    async placeBid(id: number, bidderName: string) {
        await delay(200);

        const auction = auctions.find(x => x.id === id);

        auction?.bids.push({
            bidder: bidderName,
            id: 7,
            auctionId: id,
            price: auction.currentPrice + auction.currentPrice * 1/5,
            time: Date.now()
        });

        return auction?.bids;
    }
}