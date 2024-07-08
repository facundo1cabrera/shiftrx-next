import React from 'react';
import { render } from '@testing-library/react';
import { LastBidders } from '../../../../../src/components/Auction/AuctionDetail/LastBidders/LastBidders';
import dayjs from 'dayjs';

const bids = [
  { id: 1, price: 100, bidderName: 'Test Name', time: new Date('2024-07-09T10:00:00Z').toISOString(), auctionId: 1, userId: 1 },
  { id: 2, price: 150, bidderName: 'Test Name', time: new Date('2024-07-09T11:00:00Z').toISOString(), auctionId: 1, userId: 1 },
  { id: 3, price: 200, bidderName: 'Test Name', time: new Date('2024-07-09T12:00:00Z').toISOString(), auctionId: 1, userId: 1 },
  { id: 4, price: 250, bidderName: 'Test Name', time: new Date('2024-07-09T13:00:00Z').toISOString(), auctionId: 1, userId: 1 },
  { id: 5, price: 300, bidderName: 'Test Name', time: new Date('2024-07-09T14:00:00Z').toISOString(), auctionId: 1, userId: 1 },
  { id: 6, price: 350, bidderName: 'Test Name', time: new Date('2024-07-09T15:00:00Z').toISOString(), auctionId: 1, userId: 1 },
];

test('renders the last 5 bids correctly', () => {
    const { queryByText } = render(<LastBidders bids={bids} />);
  
    // Check if the last 5 bids are rendered
    bids.slice(-5).forEach(bid => {
      expect(queryByText(`$${bid.price.toFixed(2)}`)).not.toBeNull();
      expect(queryByText(`${bid.bidderName} - ${dayjs(bid.time).format('HH:mm')}hs`)).not.toBeNull();
    });
  
    // Check that the first bid (which should be excluded) is not rendered
    expect(queryByText(`$100.00`)).toBeNull();
  });