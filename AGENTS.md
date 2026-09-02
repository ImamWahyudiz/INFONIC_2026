# AGENTS.md

Instructions for AI agents working in this repository.

## What this repo is

A GitHub-based homework submission system for Informatics students (Maba 2026). Students fork the repo, add their assignment file to `Tugas/<Kelompok>/`, and submit via Pull Request.

Not a software project. No build system, no tests, no CI, no package manager.

## Git root location

The git repository root is `INFONIC_2026/`, not the parent `INFONIC/` folder. All git commands must run from inside `INFONIC_2026/`.

## No build pipeline

There is no:
- `package.json` or JS toolchain
- Build step, bundler, or dev server
- Test runner, linter, formatter
- CI workflows or pre-commit hooks

The only runnable artifact is `index.html` — open directly in a browser or serve with any static file server (e.g., `python -m http.server 8080`).

## Student submission rules

**File naming**: `Tugas/<Kelompok>/NIM_NamaLengkap.md` (underscore, no spaces)

**Commit message format**: `Submit tugas osjur - <NIM>`

**Never modify**:
- `Tugas/NIM-NAMA.md` (the template file)
- Other students' files
- `README.md` or root folder structure

**PR rejection causes**:
- Editing template or other students' files
- Incorrect file naming
- Private/inaccessible linked files (Google Drive, Figma, etc. must be public)

## Nuxt UI v4 skill

`.agents/skills/nuxt-ui/` contains reference material for building with `@nuxt/ui` v4. It's not used by the current codebase (which is vanilla HTML). The skill applies only if you're building a new Nuxt/Vue project in this workspace.

`.agents/` and `skills-lock.json` are gitignored — don't commit them.
