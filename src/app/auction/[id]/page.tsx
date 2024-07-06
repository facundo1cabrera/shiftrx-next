
export default function AuctionDetail() {

    const auction = {
        id: "10",
        image: "/1.webp",
        title: "Antique Pocket Watch",
        description:`
        This vintage leather briefcase is a timeless and durable accessory that will elevate your professional
        style.Crafted from high- quality full-grain leather, it features a spacious main compartment, multiple
        interior pockets, and a secure zipper closure to keep your essentials organized and protected.
        The briefcase's classic design and neutral color palette make it a versatile choice that can be paired
        with a variety of outfits, from suits to casual wear.Its sturdy construction and reinforced handles
        ensure long - lasting use, making it a worthwhile investment for the modern professional`,
        currentPrice: 550.0,
        timeRemaining: "4 days 2 hours",
        shortDescription: "A timeless and durable leather briefcase, perfect for the modern professional."
    };

    return (
        <div className="flex flex-col min-h-dvh">
            <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b">
                <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
                        <div>
                            <img
                                src={auction.image}
                                alt="Product Image"
                                width={800}
                                height={600}
                                className="rounded-lg object-cover w-full aspect-[4/3]"
                            />
                        </div>
                        <div className="grid gap-6">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{auction.title}</h1>
                                <p className="text-muted-foreground mt-2 text-lg">
                                    {auction.shortDescription}
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Bid</p>
                                        <p className="text-2xl font-bold">${auction.currentPrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time Remaining</p>
                                        <p className="text-sm font-bold text-red-700 text-right">
                                            {auction.timeRemaining}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-full"></div>
                                <button className="bg-black text-white font-bold rounded-md p-4 hover:opacity-80">Place Bid</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
                        <div className="grid gap-4">
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Product Details</h2>
                            <div className="grid gap-2 text-muted-foreground">
                                <p className="">{auction.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
