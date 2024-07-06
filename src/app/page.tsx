import { AuctionCard } from "@/components/Auction/AuctionCard/AuctionCard";
import { Navbar } from "@/components/Navbar/Navbar";

export default function Home() {

  const auctions = [
    {
      id: "1",
      image: "/1.webp",
      title: "Vintage Leather Armchair",
      description: "Beautifully crafted leather armchair from the 1950s",
      currentPrice: 450.99,
      timeRemaining: "2 days 12 hours",
    },
    {
      id: "2",
      image: "/2.webp",
      title: "Antique Persian Rug",
      description: "Handwoven rug from the 19th century, in excellent condition",
      currentPrice: 1200.0,
      timeRemaining: "5 days 6 hours",
    },
    {
      id: "3",
      image: "/3.webp",
      title: "Rare Vinyl Record Collection",
      description: "Curated collection of 50 rare and out-of-print vinyl records",
      currentPrice: 750.75,
      timeRemaining: "1 day 18 hours",
    },
    {
      id: "4",
      image: "/4.webp",
      title: "Vintage Typewriter",
      description: "Fully functional 1940s typewriter in pristine condition",
      currentPrice: 325.0,
      timeRemaining: "3 days 9 hours",
    },
    {
      id: "5",
      image: "/5.webp",
      title: "Antique Pocket Watch",
      description: "Beautifully engraved pocket watch from the late 1800s",
      currentPrice: 550.0,
      timeRemaining: "4 days 2 hours",
    },
    {
      id: "6",
      image: "/6.webp",
      title: "Vintage Camera Collection",
      description: "Set of 5 rare and collectible vintage cameras",
      currentPrice: 900.0,
      timeRemaining: "2 days 15 hours",
    },
    {
      id: "7",
      image: "/7.webp",
      title: "Rare Vinyl Record Collection",
      description: "Curated collection of 50 rare and out-of-print vinyl records",
      currentPrice: 750.75,
      timeRemaining: "1 day 18 hours",
    },
    {
      id: "8",
      image: "/8.webp",
      title: "Vintage Typewriter",
      description: "Fully functional 1940s typewriter in pristine condition",
      currentPrice: 325.0,
      timeRemaining: "3 days 9 hours",
    },
    {
      id: "9",
      image: "/4.webp",
      title: "Vintage Typewriter",
      description: "Fully functional 1940s typewriter in pristine condition",
      currentPrice: 325.0,
      timeRemaining: "3 days 9 hours",
    },
    {
      id: "10",
      image: "/1.webp",
      title: "Antique Pocket Watch",
      description: "Beautifully engraved pocket watch from the late 1800s",
      currentPrice: 550.0,
      timeRemaining: "4 days 2 hours",
    },
  ]
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
