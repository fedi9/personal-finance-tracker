# 💸 Personal Finance Tracker

A full-stack web application to help users track their income and expenses securely. Built with:

- ✅ Node.js & Express
- ✅ PostgreSQL (hosted on Neon)
- ✅ JWT Authentication
- ✅ REST API structure
- ✅ Angular frontend (coming soon)

---

## 🚀 Features

- User Registration & Login with JWT
- Protected Routes for Transaction Management
- CRUD operations for:
  - Income
  - Expenses
- Analytics Summary:
  - Total income
  - Total expenses
  - Current balance
- PostgreSQL Database on Neon
- Secure password hashing with bcrypt

---

## 📁 Project Structure

personal-finance-tracker/
│
├── backend/
│ ├── controllers/ # Route logic
│ ├── routes/ # API route files
│ ├── middleware/ # Auth middleware
│ ├── db.js # PostgreSQL connection
│ ├── server.js # Entry point
│ └── .env # Environment variables (not pushed)



---

## ⚙️ Environment Variables (.env)

Create a `.env` file in `backend/`:


PORT=5000
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_HOST=your_pg_host
DB_PORT=5432
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret



If you're using Neon, use the full connection string directly in `db.js`.

---

## 📦 Install & Run Backend

```bash
cd backend
npm install
node server.js



Test endpoints using Postman.


🛠️ API Endpoints
🔐 Auth
POST /api/auth/register

POST /api/auth/login

👤 User
GET /api/users/me — Get logged-in user info

PUT /api/users/password — Update password

💰 Transactions
POST /api/transactions — Create

GET /api/transactions — List

PUT /api/transactions/:id — Update

DELETE /api/transactions/:id — Delete

📊 Analytics
GET /api/analytics/summary

✨ Coming Next
Angular frontend (/frontend)

Dashboard with charts and summaries

Monthly reports



📄 License
MIT — free to use and modify.





