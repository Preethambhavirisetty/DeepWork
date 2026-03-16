Deep Work Timer

This is a production-ready countdown timer built with React and Next.js 
designed to support deep work and focused productivity sessions.

The idea behind this application is simple:
You set a timer for a specific duration, focus on an important task, 
and try to complete the work within the allotted time without distractions.

This approach helps improve focus, time management, and productivity, 
making it easier to dedicate uninterrupted time to meaningful tasks.

Features

Simple and clean countdown timer interface
Helps structure deep work sessions
Built with Next.js App Router and React
Automatic timer updates using React state and effects
Completion chime notification when time finishes
Lightweight and fast

How it works

Set a time duration for your work session.
Start the timer.
Focus only on the task you want to complete.
When the timer ends, the session is complete.

This method encourages time-boxed deep work, helping reduce distractions and increase productivity.

Run locally
npm install
npm run dev

Open http://localhost:3000.

Build for production
npm run build
npm run start
Project structure

app/layout.js — Root layout, Google fonts, and metadata
app/page.js — Main page entry point
app/globals.css — Global styling and theme system
components/TimerApp.jsx — Timer UI and React state management
lib/time.js — Time calculation utilities
lib/sound.js — Timer completion sound generator
