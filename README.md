# Raw Commerce - A Next.js & Genkit E-commerce Starter

This is a starter project for an e-commerce application built with Next.js, TypeScript, and Genkit. It provides a solid foundation for a modern web store, complete with product listings, a shopping cart, and an admin dashboard for managing products.

The application leverages Genkit to integrate powerful AI features, such as product suggestions and AI-powered image generation.

## Key Features

*   **Next.js App Router**: For modern, performant, and scalable React development.
*   **TypeScript**: For robust, type-safe code.
*   **Genkit**: For integrating generative AI features.
*   **ShadCN/UI & Tailwind CSS**: For a beautiful, customizable, and responsive user interface.
*   **Client-Side State Management**: Using React Context for cart, wishlist, and authentication.
*   **Admin Dashboard**: A secure area for managing products, orders, and viewing analytics.
*   **AI-Powered Features**:
    *   Smart product suggestions in the cart.
    *   AI-powered product image generation.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (version 20 or later)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to get your local development environment set up and running.

### 1. Install Dependencies

First, install the necessary npm packages:
```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Genkit with Google's Gemini models for its AI capabilities. You will need a Google AI API key to run the application.

1.  Create a new file named `.env` in the root of the project directory.
2.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the key to your `.env` file:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 3. Run the Development Servers

This project requires two separate development servers to be running at the same time: one for the Next.js frontend and one for the Genkit AI flows.

#### Terminal 1: Start the Genkit Flows

In your first terminal window, run the following command to start the Genkit development server. This server handles the AI logic.

```bash
npm run genkit:watch
```
This will start the Genkit flows in watch mode, so any changes you make to the flows will be automatically reloaded.

#### Terminal 2: Start the Next.js App

In a second terminal window, run the following command to start the Next.js development server for the main application.

```bash
npm run dev
```

### 4. Access the Application

Once both servers are running, you can access the application in your browser at:

**http://localhost:9002**

You can log in to the admin dashboard using the following credentials:
*   **Email**: `admin@example.com`
*   **Password**: `password`

## Available Scripts

*   `npm run dev`: Starts the Next.js development server on port 9002.
*   `npm run genkit:dev`: Starts the Genkit development server.
*   `npm run genkit:watch`: Starts the Genkit server in watch mode.
*   `npm run build`: Builds the Next.js application for production.
*   `npm run start`: Starts a production server for the built Next.js app.
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
*   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
