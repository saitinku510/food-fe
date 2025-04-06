# Food Product Search App 🍎

This is a food product search application built using React, integrated with the Open Food Facts API, and deployed on Vercel.

🚀 Live Demo
👉 Click the link below to view the deployed app
🔗 (https://food-fe-lake.vercel.app)

# 📦 Features

🔍 Search Products by name or category

### 📄 Product Detail Page

Displays:

Product Image

Complete list of Ingredients

Nutritional Values (Energy, Fat, Carbs, Proteins, etc.)

Labels & Tags (Vegan, Gluten-Free, Organic, etc.)

🧠 Smart Filtering & Sorting

Filter by category (Snacks, Beverages, Cheese, etc.)

Sort by Name, Nutrition Grade, and Calories

🔄 Infinite Scroll to load products dynamically

🧹 Debounced Search Input for optimized API calls

⚡ Loading Skeletons & Error Handling for smooth UX

💾 React Query Caching & Pagination

🛠️ Tech Stack
React

React Router

React Query (TanStack)

Material UI

Sass

Vercel (for deployment)

### 🧠 Approach

Leveraged Open Food Facts’ public API to fetch paginated results and product details.

Used useInfiniteQuery from React Query to implement efficient pagination.

Implemented debounced search and filters for performance.

Designed a responsive UI with Material UI & custom styles.

### ⏱ Time Taken

Approximately 6–8 hours over two sessions, including development, UI polish, and deployment.

### 📁 How to Run Locally

bash
Copy
Edit
git clone https://github.com/saitinku510/food-fe
cd food-fe
npm install
npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.