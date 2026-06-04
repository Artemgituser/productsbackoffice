# Backoffice Dashboard Project

## 🎯 Project Overview
A modern, dark-themed backoffice application for managing products and categories. The system provides real-time statistics, inventory management, and secure administrative access.

### Functional Requirements
- **Authentication**: Secure login (`/login`) with JWT.
- **Dashboard**: High-level metrics, stock alerts, and category distributions.
- **Product Management**: Full CRUD with search, sort, pagination, and CSV export.
- **Category Management**: Simple CRUD for organizing products.
- **Visuals**: Dark-themed, cloud-platform aesthetic with modular grids and glass-like panels.

---

## 🛠 Engineering Standards

### Frontend (Client)
- **Framework**: Vue 3 (Composition API) + Vite.
- **State Management**: Pinia (stores in `client/src/stores`).
- **Routing**: Vue Router (configured in `client/src/router`).
- **Styling**: 
  - **Tailwind CSS 4**: Used for layout, utilities, and design system tokens.
  - **Design Tokens**: Defined in `@theme` block in `style.css` (Colors: `primary`, `surface`, `text`, etc.).
  - **Components**: Follow the "Glassmorphism" style using `glass-panel` and custom button classes.
- **Typography**: `IBM Plex Sans` (weights 100-900).

### Backend (Server)
- **Runtime**: Node.js + Express.
- **ORM**: Sequelize with MySQL (CommonJS modules).
- **Authentication**: JWT (JSON Web Tokens) sent in `Authorization: Bearer <token>` header.
- **Security**: `bcryptjs` for password hashing.
- **Middleware**: Authentication check on all protected `/api` routes.

---

## 📋 Core Workflows

### Development Setup
1.  **Backend**:
    ```bash
    cd server
    npm install
    npm start # or npm run dev for nodemon
    ```
2.  **Frontend**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

### Database Management
- **Models**: Defined in `server/models/`.
- **Seeding**: Run `npm run seed` in the `server` directory to populate the database with faker-generated data.

---

## 📂 Project Structure
```text
backoffice/
├── client/           # Vue.js application
│   ├── src/
│   │   ├── api.js    # Axios instance and API calls
│   │   ├── stores/   # Pinia stores (auth.js, etc.)
│   │   ├── views/    # Page components
│   │   └── style.css # Tailwind 4 configuration
└── server/           # Node.js API
    ├── app.js        # Entry point
    ├── models/       # Sequelize definitions
    ├── routes/       # API endpoints
    └── seed.js       # Database seeder
```
