# Project Name: AgenticTask Board

A modern, Kanban-style task management application built with **Angular 21.2.2**, utilizing **json-server** for a mock REST API and integrating **OpenSpec Agentic AI** to assist with task automation and smart descriptions.

## 🚀 Overview
The goal of this project is to create a highly interactive task board that mimics tools like Jira or Trello, but with an added layer of AI intelligence to help categorize and refine tasks.

## 🛠 Tech Stack
- **Frontend:** Angular (Signals, Standalone Components, Tailwind CSS)
- **Mock Backend:** `json-server` (Running on port 3000)
- **AI Integration:** OpenSpec Agentic AI (for task refinement/generation)
- **State Management:** Angular Signals or RxJS Subject-based store
- **Drag & Drop:** `@angular/cdk/drag-drop`

---

## 📋 Requirements & Features

### 1. Board Columns (Task Statuses)
The board must support the following workflow states:
- **Backlog/Todo:** Initial entry point for ideas.
- **Ready:** Tasks groomed and ready for development.
- **Doing:** Currently active tasks.
- **Waiting:** Blocked or pending external feedback.
- **Done:** Completed tasks.
- **Rejected:** Tasks that will not be pursued.

### 2. Core Functional Features
- **Drag & Drop:** Move tasks between columns seamlessly.
- **CRUD Operations:** Create, Read, Update, and Delete tasks via the mock API.
- **Search & Filter:** Filter tasks by title or priority.
- **Task Details:** A modal or side-panel to edit descriptions, tags, and deadlines.
- **Persistence:** All changes must sync with `db.json`.

### 3. Agentic AI Features (OpenSpec)
- **Smart Task Generation:** Given a short prompt (e.g., "Fix login bug"), the agent should generate a full description and acceptance criteria.
- **Auto-Categorization:** The AI suggests the best column or priority based on the task content.
- **Health Check:** An agent that analyzes the "Waiting" column and suggests actions to unblock tasks.

---

## 🏗 Data Model (`db.json`)
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Setup Angular Project",
      "description": "Initialize the project with Tailwind and CDK",
      "status": "done",
      "priority": "high",
      "category": "Infrastructure",
      "estimate": 3,
      "createdAt": "2024-03-11T10:00:00Z"
    }
  ]
}