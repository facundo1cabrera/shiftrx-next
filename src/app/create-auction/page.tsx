"use client";
import { Navbar } from "@/components/Navbar/Navbar";
import { AuctionService } from "@/services/AuctionService";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormError {
    type: string,
    content: string
}

export default function CreateAuction() {
    const [description, setDescription] = useState('');
    const [endTime, setEndTime] = useState('');
    const [image, setImage] = useState('');
    const [startingPrice, setStartingPrice] = useState(100);
    const [title, setTitle] = useState('');
    const [formErrors, setFormErrors] = useState<FormError[]>([]);

    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Navbar />
    }

    if (!session || !session.user) {
        router.push('/login');
        return;
    }

    const auctionService = new AuctionService();

    const handleSubmit = async () => {
        setFormErrors([]);
        const currentErrors = [];

        if (description.length <= 15) {
            currentErrors.push({
                type: 'description',
                content: 'The description should be at least 15 chracters.'
            });
        }

        if (endTime.length === 0) {
            currentErrors.push({
                type: 'end-time',
                content: 'The end time of the auction must be defined.'
            });
        } else if (dayjs(endTime).diff(dayjs(Date.now()), 'hour') < 1) {
            currentErrors.push({
                type: 'end-time',
                content: 'The end time of the auction must be at least 1 hour in the future.'
            });
        } else if (dayjs(endTime).diff(dayjs(Date.now()), 'hour') > 24) {
            currentErrors.push({
                type: 'end-time',
                content: 'Currently, we only support short tem auctions of less than 24 hours.'
            });
        }

        if (image.length < 5) {
            currentErrors.push({
                type: 'image',
                content: 'Image must be a valid image url.'
            });
        }

        if (title.length < 10) {
            currentErrors.push({
                type: 'title',
                content: 'Title value is too short.'
            });
        }

        if (startingPrice < 0) {
            currentErrors.push({
                type: 'price',
                content: 'Starting price must be positive.'
            })
        }

        if (currentErrors.length !== 0) {
            setFormErrors(currentErrors);
            return;
        }

        await auctionService.createAuction({
            accessToken: session.backendTokens.accessToken,
            description,
            endTime,
            image,
            startingPrice,
            title,
            userId: session.user.id
        });

        router.push('/');
    }

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
                <div className="pb-6">
                    <h1 className="text-3xl font-bold pb-1">Create Auction</h1>
                    <p>List your item for auction.</p>
                </div>
                <div>
                    <form className="grid gap-6">
                        <div className="grid gap-2">
                            <label htmlFor="title">Title</label>
                            <input id="title" placeholder="Vintage Leather Briefcase"
                                value={title}
                                onChange={(e) => setTitle(e.currentTarget.value)}
                            />
                            {formErrors.filter(x => x.type === 'title').map(x => (
                                <p className="text-red-700" key={x.content}>{x.content}</p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows={4} placeholder="Describe your item in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.currentTarget.value)}
                            />
                            {formErrors.filter(x => x.type === 'description').map(x => (
                                <p className="text-red-700" key={x.content}>{x.content}</p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="image-url">Image URL</label>
                            <input id="image-url" placeholder="https://example.com/image.jpg"
                                value={image}
                                onChange={(e) => setImage(e.currentTarget.value)}
                            />
                            {formErrors.filter(x => x.type === 'image').map(x => (
                                <p className="text-red-700" key={x.content}>{x.content}</p>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="starting-price">Starting Price</label>
                                <input id="starting-price" type="number" placeholder="100"
                                    value={startingPrice}
                                    onChange={(e) => setStartingPrice(+e.currentTarget.value)}
                                />
                                {formErrors.filter(x => x.type === 'price').map(x => (
                                    <p className="text-red-700" key={x.content}>{x.content}</p>
                                ))}
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="end-time">End Time</label>
                                <input id="end-time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.currentTarget.value)} />

                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                {formErrors.filter(x => x.type === 'price').map(x => (
                                    <p className="text-red-700" key={x.content}>{x.content}</p>
                                ))}
                            </div>
                            <div className="grid gap-2">
                                {formErrors.filter(x => x.type === 'end-time').map(x => (
                                    <p className="text-red-700" key={x.content}>{x.content}</p>
                                ))}
                            </div>

                        </div>
                    </form>
                </div>
                <div className="flex justify-start pt-8">
                    <button className="bg-black text-white px-8 py-3 rounded-md"
                        onClick={() => handleSubmit()}
                    >Create Auction</button>
                </div>
            </div>
        </>
    );
}
