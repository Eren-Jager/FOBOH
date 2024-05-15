# FOBOH Pricing Module

## Overview
This project consists of a backend service and a frontend application for a pricing module that allows suppliers to add and remove products from their profiles and adjust prices dynamically.

## Backend
The backend is built with .NET, providing API endpoints to manage products and pricing profiles.

### Technologies
- .NET Core
- ASP.NET Web API
- React

### Setup
1. **Clone the repository**:
    ```bash
    git clone https://github.com/Eren-Jager/FOBOH
    cd PricingAPI
    ```
2. **Build the project**:
    ```bash
    dotnet build
    ```
3. **Run the project**:
    ```bash
    dotnet run
    ```
4. **Access Swagger UI**:
    Navigate to `http://localhost:5175/swagger/index.html` to explore the API endpoints.

### Important Endpoints
- **Get Product Summaries**: `GET /api/Data/allProducts`
- **Get All Products**: `GET /api/Data/allProducts`
- **Get Subcategories**: `GET /api/Data/subcategories`
- **Get Segments**: `GET /api/Data/segments`
- **Get Brands**: `GET /api/Data/brands`
- **Search Products**: `GET /api/Pricing/search-products?searchTerm={term}`
- **Search by SKU**: `GET /api/Pricing/search-SKU?sku={sku}`
- **Filter Products**: `GET /api/Pricing/filter-products?category={category}&segment={segment}&brand={brand}`
- **Adjust Prices**: `POST /api/Pricing/adjust-price`
- **Fetch Products by SKUs**: `POST /api/Pricing/fetch-by-skus`

## Frontend
The frontend is built with React and TypeScript, providing a user interface component for suppliers to manage their products and pricing profiles.

### Features
- **Product Management**: Search and filter products.
- **Price Adjustments**: Interface to apply price adjustments.
- **Dynamic Data Fetching**: Fetch data from the backend based on user inputs.

### Technologies
- React
- TypeScript
- Material-UI

### Setup
1. **Clone the repository**:
    ```bash
    cd pricing-app
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Run the application**:
    ```bash
    npm start
    ```
4. **Access the application**:
    Navigate to `http://localhost:3000` to use the frontend application.

## Sample Data
- **Products**:
    - High Garden Pinot Noir 2021
    - Koyama Methode Brut Nature NV
    - Koyama Riesling 2018
    - Koyama Tussock Riesling 2019
    - Lacourte-Godbillon Brut Cru NV

## Tradeoffs
- **In-memory Data Storage**: Chosen for simplicity and ease of setup. For a production system, a persistent database would be necessary.
- **Dynamic Price Headers**: Implemented  for flexibility in handling various price headers without hardcoding them.
- **Material-UI for Frontend**: Provides a quick and consistent way to build a responsive UI.

## Future Enhancements
- **Persistent Database**: Integrate with a database like SQL Server or MongoDB.
- **Authentication and Authorization**: Secure the API endpoints.
- **Comprehensive Testing**: Add unit and integration tests for both frontend and backend.
- **Better Styling**: Could have done better styling to match the Figma Design even better.

---
