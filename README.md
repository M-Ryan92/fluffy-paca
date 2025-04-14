# Transactions Application

This project consists of a backend server and a frontend Angular application for managing and viewing transactions.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## Project Structure

```
fluffy-paca/
├── Backend/           # Node.js backend server
└── transactions-app/  # Angular frontend application
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start on `http://localhost:3000` and provides the following endpoints:
- `GET /transactions` - Get all transactions
- `GET /transactions/:day/:id` - Get a specific transaction by day and ID

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd transactions-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at `http://localhost:4200`.

## Running Both Applications

To run both applications simultaneously, you'll need two terminal windows:

1. Terminal 1 (Backend):
   ```bash
   cd Backend
   npm start
   ```

2. Terminal 2 (Frontend):
   ```bash
   cd transactions-app
   ng serve
   ```

## Features

- View transactions grouped by month and day
- View transaction details including:
  - Amount
  - Date and time
  - Description
  - Other party information
  - Currency conversion for foreign transactions
- Responsive design for various screen sizes

## Development

### Backend
- Written in TypeScript
- Uses Express.js for the server
- Mock data stored in `transactions.json`

### Frontend
- Built with Angular 17
- Uses standalone components
- Implements responsive design
- Uses SCSS for styling

## Testing

### Backend
```bash
cd Backend
npm test
```

### Frontend
```bash
cd transactions-app
npm test
```
