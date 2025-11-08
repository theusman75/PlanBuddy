# PlanBuddy - Expo App

## Overview

PlanBuddy is a **React Native + Expo app** that helps users turn their goals into structured, actionable tasks using the **Google Gemini AI**.

- Users can enter a goal and select a time horizon (Today / This Week).
- The app calls a backend server, which queries Gemini to generate a strictly-structured JSON task plan.
- Users can mark tasks complete/incomplete, filter by priority, and persist data locally.

---

## Tech Stack

- **React Native** (Expo managed workflow)
- **TypeScript**
- **React Navigation** (2-screen stack)
- **Zustand** (state management + async persistence)
- **AsyncStorage** (task persistence between launches)
- **@expo/vector-icons** (checkbox icons for tasks)
- **react-native-element-dropdown** (time horizon picker)

---

## Features / User Flow

1. **Create Plan Screen**

   - Enter a goal (text input).
   - Select a time horizon (dropdown: Today / This Week).
   - Press "Generate Plan" → calls `/plan` on the backend.
   - Displays loading and error states.

2. **Plan Screen**

   - Shows the list of tasks with:
     - Title + optional emoji
     - Due date
     - Priority badge
     - Optional notes
   - Checkbox to mark complete/incomplete
   - Filter by priority
   - Completion state and plan persist across app restarts

---

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/theusman75/PlanBuddy.git
cd planbuddy/app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a `.env` file in the `app/` folder:

```env
EXPO_PUBLIC_API_BASE_URL=http://...
```

> Note: Use your computer’s local network IP

### 4. Start Expo

```bash
npm start
# or
yarn start
```

- Scan the QR code with **Expo Go** (iOS/Android) or run in a simulator.

---

## Project Structure

```
app/
├─ src/
|  ├─navigation/
│  |  ├─ screens/
│  │  |  ├─ CreatePlan.tsx
│  │  |  └─ Plan.tsx
│  ├─ store/
|  |  ├─inex.ts
│  │  └─ types.ts
├─ App.tsx
└─ package.json
```

- `screens/` – UI screens (Create Plan, Plan)
- `store/` – Zustand store for tasks + persistence

---

## State Management & Persistence

- **Zustand** handles all plan and task states.
- AsyncStorage persists the latest plan and completed task states.
- On app launch, the store loads saved data automatically.
- Filtering by priority is handled via a computed store state.

---

## Choices / Tradeoffs

1. **Zustand + AsyncStorage**

   - Lightweight and simple for a 2-screen app
   - Easier than Redux for this scale

2. **Dropdown vs SegmentedControl**

   - Used `react-native-element-dropdown` for accessibility and consistency

3. **Checkbox using @expo/vector-icons**

   - Used `@expo/vector-icons` for checkbox icon

4. **No external UI library**

   - Kept dependency footprint small

5. **Error & loading states**

   - App displays clear alerts for API or validation errors

---

## Running Together With Server

1. Make sure the **backend server** is running on `http://localhost:8787` (or your network IP).
2. Start the Expo app (`npm start`) and confirm `EXPO_PUBLIC_API_BASE_URL` matches your server URL.
3. Generate a plan in the app and verify tasks are persisted after a restart.

---

## Time Spent

| Task                                             | Time     |
| ------------------------------------------------ | -------- |
| Expo project setup, navigation, CreatePlanScreen | ~15 mins |
| Zustand store + AsyncStorage persistence         | ~10 mins |
| PlanScreen + rendering + checkbox + filter       | ~25 mins |
| Testing, styling, error/loading states           | ~10 mins |
| **Total**                                        | ~60 mins |

---

## Notes

- The app **never stores the API key** — all requests go through the backend server.
- Uses strict **task schema validation** to prevent malformed plans.
- Compatible with **iOS & Android** via Expo.
- Accessible design: proper touch targets, contrast, and keyboard handling.
