# BIDUA ERP

A comprehensive Enterprise Resource Planning (ERP) web application built with React, TypeScript, and Tailwind CSS. BIDUA ERP integrates CRM, HRMS, reporting, and documentation modules into a single platform for managing customer relationships, employee records, attendance, payroll, performance, tasks, and support tickets.

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Backend Integration:** Supabase
- **Linting:** ESLint with TypeScript ESLint

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/obidua/BIDUA_ERP.git
cd BIDUA_ERP
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run the linter:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Sidebar and layout components
│   ├── dashboard/      # Main dashboard view
│   ├── crm/            # CRM module (leads, contacts, companies, deals, pipeline, support, analytics)
│   ├── hrms/           # HRMS module (employees, attendance, leaves, payroll, performance, tasks)
│   ├── employee/       # Employee self-service portal
│   ├── reports/        # Analytics and reporting
│   ├── settings/       # System configuration
│   ├── common/         # Shared/reusable components
│   └── documentation/  # In-app documentation portal
├── data/               # Mock data
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Modules

- **CRM:** Leads, contacts, companies, deals, sales pipeline, customer support, marketing campaigns, product catalog, and analytics.
- **HRMS:** Employee management, attendance tracking, leave management, payroll, performance reviews, and task management.
- **Employee Portal:** Self-service dashboard for employees to manage attendance, leaves, salary slips, documents, and profile.
- **Reports:** Cross-module analytics and reporting.
- **Documentation:** Built-in documentation portal covering architecture, API endpoints, database schemas, and development guides.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.
