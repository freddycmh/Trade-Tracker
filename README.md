📈 Option Trade Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking your options trades. This app lets users log and monitor trades with key details like ticker, strike price, expiration date, and profit/loss calculations.

✨ Features
	•	🔐 User authentication (Sign Up / Login / Logout)
	•	➕ Create, view, and delete trades
	•	📊 Trade summary with profit/loss charts
	•	📅 Track trade types like Day Trade, Swing, etc.
	•	📝 Add personal notes for each trade

🧰 Tech Stack

Frontend: React (Vite), React Router, Axios, TailwindCSS, Recharts
Backend: Node.js, Express.js, MongoDB, Mongoose
Auth & Tools: JWT, bcryptjs, dotenv, concurrently, nodemon

⚙️ Installation
	1.	Clone the repository:
git clone https://github.com/yourusername/trade-tracker.git
cd trade-tracker
	2.	Install dependencies:
npm install
cd frontend && npm install
cd ../backend && npm install

🚀 Running the App

From the root folder:
npm run dev
This will start both the frontend and backend servers concurrently.

🌐 Environment Variables

Create a .env file in the /backend folder with:
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📁 Project Structure

trade-tracker/
├── backend/         → Express API server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
├── frontend/        → React client
│   ├── src/
│   ├── public/
│   └── vite.config.js
└── package.json     → Root script runs both servers

🧠 Lessons Learned
	•	Built a full-stack MERN app
	•	Connected frontend and backend with protected routes
	•	Implemented secure JWT authentication
	•	Visualized data using Recharts

✅ Future Improvements
	•	Filter trades by date or ticker
	•	Export trades to CSV
	•	Add mobile responsiveness
	•	Edit/update trades
	•	Display win rate and average return

📬 Contact

Built with 💻 by Freddy — feel free to fork, contribute, or reach out!
