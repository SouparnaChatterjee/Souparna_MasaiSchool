# Multi-User Shopping Cart

This is a basic web-based shopping cart app that supports multiple users using `localStorage`.

## Features
- Users log in with a unique username
- Each user has a separate shopping cart
- Users can add, edit, or remove items from their cart
- The total cost is calculated in real-time
- All data is persisted using `localStorage`

## Tech Stack
- HTML
- CSS
- JavaScript

## localStorage Structure

```json
{
  "user1": [
    { "itemName": "Laptop", "price": 1000, "quantity": 1 },
    { "itemName": "Mouse", "price": 20, "quantity": 2 }
  ],
  "user2": [
    { "itemName": "Keyboard", "price": 50, "quantity": 1 }
  ]
}
