import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client';
import { PlaceBid } from '../../../../../src/components/Auction/AuctionDetail/PlaceBid/PlaceBid';
import { Bid } from '@/models/Bid';
import { AuctionDetail } from '@/models/Auction';
import { BidService } from '../../../../../src/services/BidService';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signIn: jest.fn(),
}));

jest.mock('socket.io-client', () => ({
    io: jest.fn(() => ({
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn(),
    })),
}));

jest.mock('../../../../../src/services/BidService');

describe('PlaceBid Component', () => {
    const mockSession = {
        user: {
            id: '1',
            name: 'John Doe',
        },
        backendTokens: {
            accessToken: 'fake-access-token',
        },
    };

    const mockAuction: AuctionDetail = {
        id: 1,
        title: 'Test Auction',
        description: 'Test Description',
        currentPrice: 100,
        endTime: new Date().toISOString(),
        image: 'https://example.com/image.jpg',
        bids: []
    };

    const mockBids: Bid[] = [
        {
            id: 1,
            auctionId: 1,
            userId: 1,
            price: 100,
            time: new Date().toISOString(),
            bidderName: 'Test name'
        },
    ];

    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    });

    it('should render the PlaceBid component', async () => {
        render(<PlaceBid bidsParam={mockBids} auction={mockAuction} disabled={false} />);

        const placeBidButton = await screen.findByText((content, element) => {
            return element?.textContent === "Place bid for $120.00";
        });

        expect(placeBidButton).toBeInTheDocument();
    });

    it('should call signIn when user is not authenticated', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: null });

        render(<PlaceBid bidsParam={mockBids} auction={mockAuction} disabled={false} />);

        const button = screen.getByText(/Log in to place bid/i);
        fireEvent.click(button);

        expect(screen.getByText(/Log in to place bid/i)).toBeInTheDocument();
    });

    it('should place a bid when button is clicked', async () => {
        const placeBidMock = jest.fn().mockResolvedValue({
            id: '2',
            auctionId: '1',
            userId: '1',
            price: 120,
            createdAt: new Date().toISOString(),
        });

        (BidService as jest.Mock).mockImplementation(() => ({
            placeBid: placeBidMock,
        }));

        render(<PlaceBid bidsParam={mockBids} auction={mockAuction} disabled={false} />);

        const button = await screen.findByText((content, element) => {
            return element?.textContent === "Place bid for $120.00";
        });
        fireEvent.click(button);

        await waitFor(() => {
            expect(placeBidMock).toHaveBeenCalledWith({
                auctionId: mockAuction.id,
                userId: mockSession.user.id,
                price: 120,
                accessToken: mockSession.backendTokens.accessToken,
            });
        });
    });
});