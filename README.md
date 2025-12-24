# 🚀 Stunning Task - Idea Refiner

**Turn your messy website ideas into clear, structured specifications.**

This is a full-stack AI-powered application that takes a rough description of a web project (e.g., *"I want a Tinder for adoption shelter dogs"*) and instantly architects the technical requirements, features, and design vibe for you.

![Project Banner](frontend/public/cat-glasses.png) 
---

## ✨ Features

- **⚡ Instant Refinement:** Transforms one-line ideas into comprehensive product specs.
- **🛠 Tech Stack Recommendations:** Suggests the best frontend/backend tools for the specific job.
- **🎨 UI/UX Vibe Analysis:** Determines the visual style (e.g., "Minimalist," "Playful") based on the target audience.
- **🤖 Prompt Generation:** Auto-generates a professional prompt you can copy-paste into ChatGPT/Cursor to start coding immediately.
- **💫 Fluid Animations:** Features custom spring physics and smooth layout transitions for a premium feel.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

### **Backend**
- **Framework:** [NestJS](https://nestjs.com/)
- **AI Integration:** Google Gemini (Generative AI)
- **Language:** TypeScript

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone [https://github.com/Seif-Ibrahim1/Website-Builder-Prompt-Refiner](https://github.com/Seif-Ibrahim1/Website-Builder-Prompt-Refiner)
cd stunning-project

```

### 2. Backend Setup

The backend handles the AI logic (or mock data).

```bash
cd backend
npm install

```

**Environment Setup:**
Create a `.env` file in the `backend` folder:

```env
GEMINI_API_KEY=your_google_gemini_key_here

```


**Run the Server:**

```bash
npm run start:dev

```

The backend will start on `http://localhost:3000`.

### 3. Frontend Setup

The frontend is the visual interface. Open a new terminal:

```bash
cd frontend
npm install

```

**Run the Client:**

```bash
npm run dev

```

The frontend will start on `http://localhost:3001` (or 3000 if backend is on a different port).

---

## 📂 Project Structure

```bash
stunning-project/
├── backend/            # NestJS API
│   ├── src/
│   │   ├── idea/       # Idea generation module (Controller & Service)
│   │   └── app.module.ts
│   └── ...
│
├── frontend/           # Next.js Application
│   ├── src/
│   │   ├── app/        # App Router (Page.tsx, Layout.tsx, Globals.css)
│   │   ├── components/ # React components (IdeaResult, UI elements)
│   │   └── lib/        # Utilities (cn, fetchers)
│   └── ...

```

---

## 🎨 Design System

The project uses a custom Dark Mode theme with a specific color palette:

* **Background:** Deep Void (`#0A0118`)
* **Accent:** Neon Purple (`#A923E9`) to Fuchsia Gradient
* **Success/Highlights:** Vibrant Green (`#0AF085`)
* **Typography:** Inter (Sans-serif)

---

