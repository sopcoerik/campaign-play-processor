# Campaign Play Processor

## Overview
A full-stack system that simulates a DOOH (Digital Out-of-Home) ad platform. 
Receives play events from digital screens, processes them asynchronously via 
a Redis queue, and displays real-time campaign statistics on a dashboard.

## Setup

### Prerequisites
- Node.js (v18+ recommended)
- Redis installed and running locally

1. **Install dependencies for both frontend and backend:**
```bash
   cd be
   npm install
   
   cd ../fe
   npm install
```

2. **Start Redis server:**
```bash
   redis-server
```

3. **Run the applications:**
   
   Backend (terminal 1):
```bash
   cd be
   npm run dev
```
   
   Frontend (terminal 2):
```bash
   cd fe
   npm run dev
```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Features Implemented

### Core Requirements ✅
- POST /events endpoint with Redis queue
- Background async processor (5-second intervals)
- GET /campaigns endpoint with aggregated counts
- Dashboard displaying campaign statistics
- Simulate Event button with randomized data
- Auto-refresh every 5 seconds

### Bonus Features ✅
- Pause/Resume processing toggle
- Bar chart visualization (Recharts)
- Clean component structure
- TypeScript for type safety

## Tech choices

### Frontend

#### React
Modern component-based library that adds a declarative building style. Allows for
fast development and structured projects.

#### TypeScript
Adds types to Vanilla JavaScript and forces the developer to take conscious decisions.

#### Axios
Less boiler-plate code than fetch. I just like to use it. It's simpler.

#### Recharts
Very easy way to add charts to any project that needs it.

#### Tailwind CSS
Utility-first CSS library. You don't have to bother with naming classes and creating
many CSS files. Perfect for simple design.

### Backend

#### Node.js + TS + Express
Easy to switch between Frontend and Backend as both parts are written in
the same language.

#### Nodemon
Essential for hot-reloading the server when a change is made in the code.

#### dotenv
For using environment files in the project.

## Time Spent
- **Core functionality:** ~3 hours
- **Polish & bonus features:** ~3 hours (pause/resume, charts, refactoring)
- **Total:** ~6 hours active development

## Known issues/Future improvements
As of right now, I didn't find big issues that would harm the
functionality of the application.
The following improvements can (and will be) made in the future:
  - store events in SQL database
  - add impressions per screen (visualized)
  - deploy project
  - improve UI with shadcnUI or other UI library
  - testing with Jest/React Testing Library (or Vitest)
  - other refactors/logic improvements
  list to be continued...