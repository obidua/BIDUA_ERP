# Contributing to BIDUA ERP

Thank you for your interest in contributing to BIDUA ERP! This document provides guidelines and instructions to help you get started.

## Getting Started

1. Fork the repository and clone your fork locally.
2. Install dependencies with `npm install`.
3. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Start the development server with `npm run dev`.

## Development Guidelines

### Code Style

- Write TypeScript for all source files (`.tsx` / `.ts`).
- Use [Tailwind CSS](https://tailwindcss.com/) utility classes for styling. Avoid adding external UI component libraries unless absolutely necessary.
- Use icons from [Lucide React](https://lucide.dev/) instead of installing additional icon packages.
- Follow the existing code patterns and component structure in the repository.

### Project Conventions

- Place new components in the appropriate module directory under `src/components/`.
- Define shared TypeScript interfaces and types in `src/types/index.ts`.
- Use React hooks (`useState`, `useEffect`, etc.) for state management.
- Keep components focused and single-purpose where possible.

### Commit Messages

- Use clear and descriptive commit messages.
- Reference related issues or pull requests when applicable (e.g., `Fix #12`).

## Submitting Changes

1. Make sure your code compiles without errors:
   ```bash
   npm run build
   ```
2. Run the linter and fix any issues:
   ```bash
   npm run lint
   ```
3. Push your branch to your fork and open a pull request against the `main` branch.
4. Describe your changes in the pull request and link any related issues.

## Reporting Issues

- Use the GitHub issue tracker to report bugs or request features.
- Include steps to reproduce the issue and any relevant screenshots or error messages.

## Questions

If you have questions about contributing, feel free to open an issue for discussion.
