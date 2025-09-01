# Bilcode Frontend

This repository contains the frontend application for Bilcode, built with React and Vite. It utilizes Tailwind CSS for styling and GSAP for animations.

## Features

*   **Multi-page Application**: Implemented routing to separate the landing page, Academy, Blog, Joki, Career, and Pricelist sections.
*   **Dynamic Navigation**: Navbar content changes dynamically based on the current page (e.g., different links for the landing page vs. Academy/Blog pages), with enhanced rendering logic for mega-menus.
*   **Joki Page**: A dedicated section for coding assignment services.
*   **Career Page**: A page outlining career opportunities and company culture.
*   **Pricelist Page**: A detailed page showcasing service packages and pricing.
*   **Academy Page**: A dedicated section offering open courses with categorized classes (Frontend, Backend, Mobile, UI/UX).
*   **Blog Page**: A separate page for blog content, including a subscription section.
*   **Smooth Scrolling**: Enhanced navigation with smooth scroll effects to different sections within a page.
*   **Splash Screen Animation**: Engaging introductory animation on application load.
*   **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across various devices.

## Technologies Used

*   **React 19**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **GSAP (GreenSock Animation Platform)**: A robust JavaScript animation library.
*   **React Router DOM**: For declarative routing in React applications.
*   **ESLint**: For code linting.

## Project Structure

This project follows a feature-based (or domain-based) architecture to ensure modularity, scalability, and ease of maintenance. Each feature is self-contained within its own directory, promoting a clean separation of concerns.

-   **`src/`**: Main source directory.
    -   **`components/`**: Contains global, reusable React components that are shared across multiple features (e.g., `Header`, `Footer`, `Button`).
    -   **`data/`**: Holds global static data, constants, or mock data used throughout the application.
    -   **`features/`**: The core of the architecture. Each subdirectory is a self-contained feature.
        -   **`landing/`**: The main company landing page.
            -   `pages/`: Page components for this feature.
            -   `sections/`: Large, section-based components that make up a page (e.g., `Hero`, `Portfolio`).
            -   `components/`: Smaller, reusable components specific to this feature.
            -   `data/`: Data specific to this feature.
        -   **`academy/`**: The online learning platform feature.
            -   `pages/`: Page components for the academy (e.g., `CoursesPage`, `BlogPage`).
            -   `components/`: Components specific to the academy.
            -   `data/`: Data specific to the academy.
        -   **`joki/`**: For the freelance/contract work feature.
        -   **`templates/`**: (Scaffold) For the template marketplace feature.
    -   **`hooks/`**: Global custom React hooks.
    -   **`layouts/`**: High-level layout components that wrap pages (e.g., `MainLayout`).
    -   **`services/`**: Global API clients and functions for interacting with backend services.
    -   **`utils/`**: Global utility and helper functions.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js installed (version 18 or higher is recommended).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/rizky28eka/bilcode-fe.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd bilcode-fe
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
```

This will typically run the application on `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
npm run build
```

This command will generate a `dist` directory with the production-ready optimized build.

### Linting

To run ESLint to check for code quality issues:

```bash
npm run lint
```

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```