# LittleBytes — Smart Ingredient-Based Meal Planning  
*A cozy recipe app for college students*

LittleBytes is a meal-planning web app designed to help busy college students decide what to cook without wasting food or overspending.

Users can:
* Enter ingredients they already have
* Discover recipes thorugh our customer backend API
* View detailed step-by-step instructions
* Save favorite meals using a Supabase databse
* Browse saved recipes with a smooth, mobile-friendly carousel

This app is inspired by the warm, comforting aesthetic of my favorite movie, Ratatouille and Paris. The UI is intentionally calming, encouraging users to enjoy cooking rather than feel overwhelmed by it.

**Live Demo (Vercel):**
https://inst377-littlebytes-alexa-git-main-achu1911s-projects.vercel.app

---

## Target Browsers ##
LittleBytes is designed to work on all modern desktop browsers, including:

- **Google Chrome (Recommended)**
- **Safari (iOS)**
- **Firefox**
- **Edge**
- **Mobile browsers (iOS + Android)**

---

## Application Pages  
- **Home:** Welcome screen with Paris-style design  
- **About:** App purpose & student focus  
- **Recipes:** Ingredient-based search using TheMealDB API  
- **Recipe Detail Page:** Full instructions, ingredients, and photos
- **Favorites:** Save and manage recipes to Supabase database

---

## Overview of Developer Manual  
The following section is intended for future developers who may maintain or want to ectend this project. It explains how to set up, run, and understand the system architecture.

## Developer Manual
**Technology Stack**:
* Frontend: React, React Router, Tailwind CSS
* Backend: Node.js serverless functions (Vercel)
* Database: Supabase 
* External API: TheMealDB (https://www.themealdb.com/api.php)
* Deployment: Vercel

## Installation & Setup
**Prerequisites**:
* Node.js (v18 or later recommended)
* npm
* Git

1. Clone the Repository
* git clone https://github.com/achu1911/inst377-littlebytes-alexa.git
* cd inst377-littlebytes-alexa

2. Install Dependencies
* cd frontend
* npm install

3. Environment Variables
Create environment variables either locally or through Vercel. My application requires environment variables to connect to Supabase, but for security reasons, my actual API keys are not included in this repository.

To deploy it yourself, you must create the following environment variables:

Required variables:
* SUPABASE_URL=your_supabase_project_url
* SUPABASE_KEY=your_anon_public_key
* SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

4. Supabase Database Schema
LittleBytes uses a Supabase PostgreSQL database to store user-favorited recipes. The database was designed specifically for this application.

### Table: `favorites`
Column Name |   Type    | Description
id          |  integer  | Primary key, auto-incremented
created_at  | timestamp | Automatically generated timestamp when the record is created
recipe_id   |   text    | Recipe ID from TheMealDB API
recipe_name |   text    | Name of the recipe
image       |   text    | URL of the recipe image 

5. Running the Application Locally
* npm run dev

## Deployment ## 
This application is deployed using Vercel.
* My frontend is built from the /frontend directory
* Backend APIs are implemented as serverless functions under /frontend/api
* Client-side routing is handled using React Router with Vercel rewrites

## Backend API Documentation ## 
GET /api/recipes
Description: Fetches recipes based on a comma-separated list of ingredients

Query Parameters:
* ingredients: list of ingredients (e.g. onion, garlic)
* However, it is important to note that the Free Tier from the API only has certain ingredients, so some ingredients may not be searchable. 

GET /api/recipe
Description: Gets full details for a single recipe.

Query Parameters:
* id: recipe ID from TheMealDB

GET /api/favorites
Description: Returns all favorite recipes from Supabase

POST /api/favorites
* Description: Saves a recipe to the favorites table. 

Body Parameters: {
  "recipe_id": "string",
  "recipe_name": "string",
  "image": "string"
}

DELETE /api/favorites?id= 
* Description: Deletes a favorited recipe by database ID.

## Testing ##
No automated tests are currently implemented. Manual testing was conducted thorugh browser interaction and API endpoint verification.

## Known Issues ##
* Favorites are shared across all users right now. In the future, I do want to implement some sort of profile system so that each user can have a unique database.
* No offline support.
* Limited error handling for API rate limits.

## Future Improvements ##
1. User authentication and personal favorite lists
2. Nutrition & dietary filtering
3. Weekly meal planning aclendar
4. Grocery list generation
5. Accessibility improvements

## Author ##
**Alexa Chu**
INS377 -- Section 0101
University of Maryland
Fall 2025 

