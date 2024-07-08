import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { AuctionCard } from '../../../../src/components/Auction/AuctionCard/AuctionCard';
import '@testing-library/jest-dom';
import { AuctionHome } from '@/models/Auction';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuctionCard', () => {
  const auction: AuctionHome = {
    id: 1,
    image: '/test-image.jpg',
    title: 'Test Auction',
    description: 'This is a test auction',
    currentPrice: 100.0,
    endTime: dayjs().add(1, 'day').toISOString(),
  };

  it('renders the auction details correctly', () => {
    render(<AuctionCard auction={auction} />);

    // Check if the title is rendered
    expect(screen.getByText(auction.title)).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText(auction.description)).toBeInTheDocument();

    // Check if the current price is rendered
    expect(screen.getByText(`$${auction.currentPrice.toFixed(2)}`)).toBeInTheDocument();

    // Check if the end time is rendered correctly
    expect(screen.getByText(`Ends at ${dayjs(auction.endTime).format("HH:mm")}`)).toBeInTheDocument();

    // Check if the image is rendered
    const image = screen.getByAltText(auction.title);
    expect(image).toHaveAttribute('src', auction.image);
  });

  it('navigates to the auction detail page on button click', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<AuctionCard auction={auction} />);

    const button = screen.getByRole('button', { name: /View Auction/i });
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith(`/auction/${auction.id}`);
  });

  it('shows "Ended at" text when the auction is over', () => {
    const endedAuction = {
      ...auction,
      endTime: dayjs().subtract(1, 'day').toISOString(),
    };

    render(<AuctionCard auction={endedAuction} />);

    expect(screen.getByText(`Ended at ${dayjs(endedAuction.endTime).format("DD/MM HH:mm")}`)).toBeInTheDocument();
  });
});