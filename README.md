# TaskDuty

A simple task manager I built for the Techstudio internship (Week 1). You can add tasks, edit them, mark them done, and filter them by category or status. Everything's saved in your browser, so your tasks are still there when you refresh.

## What it does

- Add, edit, and delete tasks
- Mark tasks as done or not done
- Filter by category (Work, Personal, Urgent) and by completion status
- Won't let you submit a task with missing info or a due date in the past
- Saves your tasks in the browser (localStorage) so they don't disappear on refresh
- Works well on phone, tablet, and desktop

## Built with

React, TypeScript, Tailwind CSS, React Router

## Running it locally

```bash
cd client
npm install
npm run dev
```

Then open the local link it gives you in the terminal.

## Folder structure

personal-task-manager/
├── client/ (frontend)
└── server/ # left empty on purpose

## Known issues

for this stage,tasks are only saved in your own browser. they won't show up if you open the app on a different device or browser.
