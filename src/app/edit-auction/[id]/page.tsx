"use client"
import { Navbar } from "@/components/Navbar/Navbar"
import { AuctionService } from "@/services/AuctionService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface FormError {
    type: string,
    content: string
}

export default function EditAuction({ params }: { params: { id: string } }) {
    const auctionService = new AuctionService();

    const router = useRouter();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [formErrors, setFormErrors] = useState<FormError[]>([]);

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Navbar />
    }

    if (!session || !session.user) {
        router.push('/login');
        return;
    }

    const handleSubmit = async () => {
        setFormErrors([]);
        const currentErrors = [];

        if (description.length <= 15) {
            currentErrors.push({
                type: 'description',
                content: 'The description should be at least 15 chracters.'
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

        if (currentErrors.length !== 0) {
            setFormErrors(currentErrors);
            return;
        }

        await auctionService.updateAuction({
            accessToken: session.backendTokens.accessToken,
            description,
            image,
            title,
            auctionId: +params.id
        });

        router.push(`/auction/${params.id}`);
    }


    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
                <div className="pb-6">
                    <h1 className="text-3xl font-bold pb-1">Edit an Auction</h1>
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
                    </form>
                </div>
                <div className="flex justify-start pt-8">
                    <button className="bg-black text-white px-8 py-3 rounded-md"
                        onClick={() => handleSubmit()}
                    >Save Changes</button>
                </div>
            </div>
        </>
    );
}
