# University Accommodation Management System

A premium, full-stack database management dashboard built for a University Accommodation Office. This project provides a robust interface to track students, administer hall capacity, manage multi-person flats, and securely authenticate staff members.

## 🚀 Key Features

*   **Staff Authentication Portal:** A professional, secure login interface for authorized personnel only, featuring session persistence and role-based name displays.
*   **Flat Management System:** Detailed tracking and capacity reporting for 3, 4, and 5-person shared apartments (Flats), integrated into the main Hall dashboard.
*   **Live Occupancy Reporting:** Real-time calculation of residence percentage based on total bed capacity across all halls and flats.
*   **Interactive Dashboard Reports:** Live, searchable metrics satisfying comprehensive database analysis (Waitlists, Student Categories, Summer Leases, and Rent Statistics).
*   **Database Management (CRUD):** Live action menus allowing rapid updating of relational data tables directly from the frontend UI.
*   **Student Registration:** Seamless "Add Student" workflow with housing preference selection (Halls vs. Flats).

## 🛠️ Technology Stack

*   **Frontend:** React (Vite), JavaScript, Vanilla CSS (`index.css`), Lucide-React Icons
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL (interfaced via `mysql2`)
*   **Design System:** High-contrast, "boxy" professional dashboard aesthetic with a teal/navy color palette.

## 📂 Project Structure
*   `/frontend/`: React components, views, and styling.
*   `/server.js` & `/db.js`: Node API endpoints acting as the bridge for specialized MySQL queries.
*   `/schema.sql`: Raw DDL commands defining Tables, Data Types, and Foreign Key constraints.
*   `/seed.sql`: Initial dataset populated with 300+ records for robust testing.

---

## 💻 Local Setup & Installation

### 1. Database Configuration
1. Install **MySQL** (Community Server & Workbench recommended).
2. Execute the `schema.sql` file to build the relational tables.
3. Execute the `seed.sql` file to populate the application with the initial data.

### 2. Backend Initialization
1. In the root project directory, create a `.env` file:
```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=YourPassword
DB_NAME=accommodation_db
```
2. Run the following in your terminal:
```bash
npm install
node server.js
```

### 3. Frontend Initialization
1. Open a *second* terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
2. Navigate to `http://127.0.0.1:3000` in your web browser.

### 🔑 Default Credentials
- **Staff Email:** `ananya1@univ.edu`
- **Password:** `staff123`
