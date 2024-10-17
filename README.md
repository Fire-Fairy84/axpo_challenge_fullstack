Energy Market Balancing Application ⚡️

## Table of Contents

- [Project Overview ✨](#project-overview-)
- [Installation 🛠️](#installation-)
    - [Requirements](#requirements-)
- [Project Structure 💻](#project-structure-)
- [Technologies 🚀](#technologies-)
- [Usage 🔥](#usage-)
- [Contribution 🤝](#contribution-)


## Project Overview ✨

This project is a front-end application that visualizes energy market balancing data, using forecasted energy inflows and outflows. The goal is to help participants in the energy market maintain grid stability by tracking and balancing energy inflows (e.g., renewable sources like solar and wind) against outflows (e.g., industrial consumption).

The application uses React for the frontend and connects to a backend API written in C# that provides the necessary data, including balancing circles and their members. The frontend visualizes the day-ahead imbalances at the balancing circle level and provides a drill-down view at the member level.

### Key Features

- Data Retrieval and Imbalance Calculation:

- The app queries the provided API to retrieve the list of balancing circles and their members.

- For each member, it retrieves forecasted energy production or consumption data.

- Imbalances are calculated using the formula:

- Imbalance(t) = Total Inflows(t) - Total Outflows(t)

### Data Visualization:

- Displays hourly imbalance data at the balancing circle level using graphical representations.

- Implements a drill-down feature for visualizing detailed inflow and outflow data at the member level.

- Uses Victory charts to present the data in an easily comprehensible format.



## Installation 🚧

### Requirements

- Node.js

- .NET SDK

- Git

### Installation for Backend

1. Clone the backend repository:
```bash
git clone https://github.com/Fire-Fairy84/axpo_challenge_fullstack.git
```
2. Navigate to the backend directory:
```bash
cd axpo_challenge_fullstack/Axpo.Challenge.FullStack
```
3. Run the API using .NET CLI:
```bash
dotnet run
```
The API will be available at http://localhost:5295.

### Installation for Frontend

1. Navigate to the frontend directory:
```bash
cd axpo_challenge_fullstack/frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The application will be running at http://localhost:5173.

## Project Structure 💻

### Backend Folder Structure
```plaintext
/
├── backend/
│   ├── Controllers/
│   ├── Extensions/
│   ├── Properties/
│   ├── Program.cs
│   └── ...
```
### Frontend Folder Structure
```plaintext
/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── balancingCircles/
│   │   │   ├── circleImbalanceData/
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ...
```
## Technologies 🚀

### Backend Technologies

- .NET Core: A cross-platform framework for building backend services and APIs.

- C#: The primary language used to implement the backend API.

- ASP.NET Core Web API: Framework used for building RESTful APIs.

- Swagger: Used for API documentation and testing endpoints interactively.

### Frontend Technologies

- React 18.3.1: A JavaScript library for building user interfaces.

- React DOM 18.3.1: Manages rendering React components to the DOM.

- Axios 1.7.7: A promise-based HTTP client for making API requests.

- Prop-Types 15.8.1: Used to type-check the props in React components.

- React Router DOM 6.27.0: A library for handling routing in React applications.

- Victory 37.2.0: A charting library for React to create interactive data visualizations.



## Usage 🔥

- To start the backend server, navigate to the backend directory and run:
```bash
dotnet run
```
- To start the frontend server, navigate to the frontend directory and run:
```bash
npm run dev
```
## Contribution 🤝

1. Fork the repository.

2. Create a new branch for your feature:
```bash
git checkout -b feature/new-feature
```
3. Commit your changes:
```bash
git commit -m 'Add new feature'
```
4. Push your branch:
```bash
git push origin feature/new-feature
```
5. Open a pull request to merge into the main branch.
