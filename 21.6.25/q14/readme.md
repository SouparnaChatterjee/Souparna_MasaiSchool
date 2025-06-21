# Q14 - Firebase Delete Function Fix

## Overview

This project demonstrates the corrected implementation of a delete function in a Firebase Realtime Database context. The issue was with using a static URL instead of dynamically injecting the correct user key. This has now been fixed.

## Features

- Fetches and displays user feedback from Firebase in a table
- Allows users to delete feedback entries
- Automatically refreshes the table after deletion

## Fixed Bug

### Original Bug:
The original `deleteUser` function used:
```js
fetch(`https://your-project-id.firebaseio.com/users/key.json`)
