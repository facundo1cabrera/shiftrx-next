"use client";
import { AuctionCard } from "@/components/Auction/AuctionCard/AuctionCard";
import { Navbar } from "@/components/Navbar/Navbar";
import { AuctionHome } from "@/models/Auction";
import { AuctionService } from "@/services/AuctionService";
import { useEffect, useState } from "react";

export default function Home() {

  const auctionService = new AuctionService();
  const [auctions, setAuctions] = useState<AuctionHome[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await auctionService.getAllAuctions();
      setAuctions(result); 
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex justify-center pt-4">
        <div className="w-full h-full flex flex-col justify-center sm:w-4/5">
          <h1 className="text-2xl font-semibold py-6">Current auctions</h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4 md:py-6">
            {auctions.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
