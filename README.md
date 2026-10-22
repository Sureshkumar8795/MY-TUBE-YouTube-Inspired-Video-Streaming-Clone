# MY TUBE — YouTube-Inspired Video Streaming Clone

MY TUBE is a personal video-platform project inspired by the layout and browsing experience of modern video-sharing websites. I created this project as a reverse-engineering and learning exercise, using the **REA GitHub repository by `morluto` as the starting point** and customizing the project identity with my own name and branding: **MY TUBE**.

**Original repository used:** https://github.com/morluto/rea

> **Credit and clarification:** This project uses the REA repository as a starting point. The original repository and its authors are not my work. Please review the original repository's license and terms before reusing or redistributing its code. MY TUBE is an independent educational project and is not affiliated with or endorsed by YouTube.

## About the Project

In this project, I explore the REA repository, set it up locally, and use it as a starting point for a YouTube-inspired website named MY TUBE. The goal is to learn about reverse engineering, repository setup, and web development.

## Tech Stack

- **React 19** — UI components
- **Vite 8** — local development server and production build
- **Lucide React** — icons
- **Oxlint** — code linting
- **Roboto** — interface font

## Requirements

- Node.js (use a version supported by your installed Vite version)
- npm
- Git

## Getting Started

1. Clone or download this MY TUBE project.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project Structure

```text
my-tube/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── .oxlintrc.json
└── src/
    └── main.jsx
```

The complete project should include the `src/` folder and its components. The configuration files reviewed for this README did not include the application source files, so the exact UI and features could not be independently verified from those files alone.

## YouTube Video Description

Copy-ready description for the video introducing this project:

> 🔥 **I reverse engineered YouTube and created my own video streaming website called MY TUBE!**
>
> In this video, I explore the REA repository and use it as a starting point to build my own YouTube-style website, **MY TUBE**. I’ll walk through the setup process, explain the concept, and show the final output.
>
> 🚀 **What you'll learn:**
>
> - How to explore a reverse-engineering project
> - How to clone a GitHub repository
> - How to set up the project using Antigravity IDE
> - How to build a YouTube-inspired website called MY TUBE
> - How to run the project and view the output
>
> 🔗 **GitHub Repository (REA):**  
> https://github.com/morluto/rea
>
> 🛠️ **Tools Used:**
>
> - Antigravity IDE
> - Git and GitHub
> - Node.js and npm
> - React + Vite
>
> 💡 This is an educational project to explore reverse engineering and website development. MY TUBE is an independent project and is not affiliated with or endorsed by YouTube. The REA repository linked above was used as the starting point; credit for the original repository belongs to its respective creator(s).
>
> If you enjoy this video, **LIKE 👍, SHARE 🚀, and SUBSCRIBE 🔔** for more AI tools, coding experiments, and real-world projects!
>
> #MyTube #YouTubeClone #ReverseEngineering #GitHub #AntigravityIDE #ReactJS #WebDevelopment #Coding #AIProjects

## Screenshot

After running the project, save a screenshot as `screenshots/my-tube-home.png` and add it to this section:

```markdown
![MY TUBE home page](screenshots/my-tube-home.png)
```

## Build for Production

```bash
npm run build
```

Vite writes the production output to the `dist/` directory.

## License

No separate license has been specified for MY TUBE in the files reviewed. Check the REA repository's license before redistributing or publishing derivative code, and add a license file only when you have the rights and terms clearly established.
