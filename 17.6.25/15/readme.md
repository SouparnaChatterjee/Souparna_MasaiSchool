# Product Search & Filter App

This is a simple web application built using HTML, CSS, and JavaScript that allows users to:

- Search products by title
- Filter products by category
- Sort products by price (ascending/descending)
- See the number of matching products

It fetches real-time product data from the FakeStore API.

---

## Features

- Dynamic Data Fetching  
  Fetches products from `https://fakestoreapi.com/products` and categories from `https://fakestoreapi.com/products/categories`.

- Search Functionality  
  Real-time search as you type in the search box.

- Category Filtering  
  Filter products by dynamically loaded categories.

- Sorting  
  Sort products by price either from low to high or high to low.

- Responsive Grid Display  
  Products are displayed in a responsive grid with their image, title, and price.

- Product Count  
  Displays how many products match the current search/filter/sort criteria.

---

## How to Run

1. Clone the repository or download the code.
2. Open `index.html` in any modern web browser.
3. Use the search bar, dropdown filters, and sort options to interact with the product list.

---

## Files Overview

- `index.html` – HTML structure of the app
- `style.css` – Basic styling and layout
- `script.js` – JavaScript logic for fetching, searching, filtering, and rendering
- `README.md` – This file, explaining the project

---

## Technical Notes

- Fetch API is used for data retrieval.
- Async/Await and try-catch blocks are used for asynchronous operations and error handling.
