# The Auction Platform Frontend
This is the frontend for the auction application, developed using React with TypeScript and NesxJS. The application allows users to create and manage auctions, place bids, and view auctions' bids in real-time.

## Instalation

This project is currently live [here](https://shiftrx-next.vercel.app/)!

But, you can try it locally by following this steps:

1) Clone the repository
```
git clone https://github.com/facundo1cabrera/shiftrx-next.git shiftrx-next
cd shiftrx-next
```

2) Install the dependencies by running the command:
```
npm install
```

3) Rename the .env.example, it should look similar to this:
```
NEXTAUTH_SECRET=yoursecretkey
NEXT_PUBLIC_BACKEND_URL=https://monkfish-app-xs5n3.ondigitalocean.app
```

4) Run the project with npm run dev
```
npm run dev
```

## Tests

Currently, the project has only a few tests as an example on how to implement them in the project.
But you can run them with:
```
npm run test
```

## Pages

The project contains 7 pages, some restricted to logged users, other open to the public, some are RSC and the others are client components.

You can find them in the following urls:

• /: Home page listing active auctions.

• /auction/:id: Page showing details of a specific auction and form to place bids.

• /create-auction: Page to create a new auction.

• /edit-auction/:id: Page to edit an existing auction.

• /login: Login page for users.

• /register: Registration page for new users.

• /dashboard: Dashboard for viewing the user's auctions and bids.

## Use cases

### Create an auction and place bids in real time between to users: 
https://www.loom.com/share/e765283f7bfd401c87c3e5f4b56c005d?sid=7ac80adc-de8f-4f2c-9a7e-ac26896c4e0c

### Create a user and login
https://www.loom.com/share/d07e8ea525544c15a7a4ef0754270b9e?sid=aef90dc9-ef05-4b6e-8a88-fdf4ef0e4715

### Try to access the dashboard unlogged, view the dashboard and edit an auction
https://www.loom.com/share/af616bc2f3434bdcad66e0439801998d?sid=c79cf120-f15e-440b-a57d-d743278a5bfd
