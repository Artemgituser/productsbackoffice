<<<<<<< HEAD
# 🏢 Backoffice Dashboard

A modern, Neumorphic-styled backoffice application for managing products and categories. Built with **Vue 3**, **Vite**, **Tailwind CSS 4**, and **Node.js**.

---

## 🚀 Features

- **Authentication**: Secure login with JWT and password hashing via `bcryptjs`.
- **Dashboard**: Real-time overview of statistics and stock alerts.
- **Product Management**: Full CRUD capabilities for managing inventory.
- **Category Management**: Organize products into logical groups.
- **Modern UI**: Unique **Neumorphic** design system built with Tailwind CSS 4.
- **Data Seeding**: Quickly populate the database with realistic mock data using Faker.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Neumorphism
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: [Express](https://expressjs.com/)
- **ORM**: [Sequelize](https://sequelize.org/) with MySQL
- **Security**: JWT (JSON Web Tokens) & bcryptjs
- **Environment**: dotenv

---

## 📂 Project Structure

```text
backoffice/
├── client/           # Frontend Vue.js application
│   ├── src/
│   │   ├── api.js    # Axios instance and API service
│   │   ├── stores/   # Pinia state stores
│   │   ├── views/    # Page components
│   │   └── style.css # Tailwind 4 & Design System
├── server/           # Backend Node.js API
│   ├── app.js        # Entry point
│   ├── models/       # Sequelize database models
│   ├── routes/       # API endpoints
│   ├── middlewares/  # Auth & Role guards
│   └── seed.js       # Database seeder (Faker)
└── docker-compose.yml # Docker configuration
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MySQL Database

### 1. Clone the repository
```bash
git clone <repository-url>
cd backOfficeNodeVue
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
DB_NAME=backoffice
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_key
PORT=3000
```
Initialize the database and seed data:
```bash
npm run seed
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🎨 Design System: Neumorphism

The project follows a Neumorphic (soft UI) design. Key components are defined in `client/src/style.css`:

- **Colors**:
  - Primary: `#006666`
  - Surface: `#E7E5E4` (Main background)
  - Text: `#0F172A`
- **Utilities**:
  - `.neumorphic-panel`: Soft extruded container.
  - `.neumorphic-btn`: Interactive soft buttons with inset state.
  - `.neumorphic-input`: Inset shadow input fields.

---


=======
# Backoffice Project

A Node.js and Vue.js backoffice application.

## Structure

- `server/`: Express backend with Sequelize.
- `client/`: Frontend application (to be initialized).

## Getting Started

### Backend

1. `cd server`
2. `npm install`
3. `npm start`
>>>>>>> 53d7e9f (first commit)
