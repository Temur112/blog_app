# Blog App — Remaining Work / Roadmap

> Status documentation: what is built, what's left, and the order to do it.
> Last updated: 2026-06-13

## Legend
- [x] Done
- [ ] Not started
- 🔴 Must-have (core) · 🟡 Should-have · 🟢 Nice-to-have

---

## ✅ Already complete

### Auth module (`src/modules/auth/`)
- [x] Register (`POST /api/auth/register`) — bcrypt hashing, duplicate checks
- [x] Login (`POST /api/auth/login`) — access + refresh tokens
- [x] Me (`GET /api/auth/me`) — protected
- [x] Refresh token (`POST /api/auth/refresh-token`)
- [x] Logout (`POST /api/auth/logout`)
- [x] Logout-all (`POST /api/auth/logout-all`) — token-version bump
- [x] JWT auth middleware + token versioning

### Posts module (`src/modules/posts/`)
- [x] Create post (`POST /api/posts`) — protected
- [x] List posts (`GET /api/posts`) — search, filter, sort, pagination
- [x] Get post by id (`GET /api/posts/:id`) — *uncommitted*

### Infrastructure
- [x] Express app + middleware (helmet, cors, morgan)
- [x] Drizzle ORM + Postgres, schema (users, posts, refresh_tokens)
- [x] Docker Compose for Postgres
- [x] Custom `AppError` + global error handler
- [x] `asyncHandler`, Zod validation middleware

---

## 🚧 What's left to complete

### 🔴 1. Fix bugs in current uncommitted code
- [ ] `ussername` → `username` typo — `src/modules/posts/post.mapper.ts:25`
- [ ] Remove double-wrapped `{ response }` — `src/modules/posts/post.controller.ts:46`
- [ ] Use `404` not `422` for "post not found" — `src/modules/posts/post.service.ts:42`

### 🔴 2. Finish Posts CRUD
- [ ] **Update post** `PATCH /api/posts/:id` — partial update + author ownership check (403 if not owner)
- [ ] **Delete post** `DELETE /api/posts/:id` — author ownership check, return `204`
- [ ] Files: validation → types → repository → service → controller → routes

### 🔴 3. Real pagination metadata
- [ ] Add a `countPosts` query sharing the same filter conditions
- [ ] Return `total` and `totalPages` in the list response (not just `page`/`limit`)

### 🟡 4. Comments module (`src/modules/comments/`)
- [ ] New schema `comments` (id, content, postId FK, authorId FK, createdAt, updatedAt) + relations + migration
- [ ] Create comment `POST /api/posts/:postId/comments` (auth)
- [ ] List comments `GET /api/posts/:postId/comments`
- [ ] Delete comment `DELETE /api/comments/:id` (auth, owner-only)
- [ ] (Optional later) threaded replies via nullable `parentId`; `@mention` parsing on write

### 🟡 5. Hardening the auth flow
- [ ] Refresh-token **rotation** (issue a new refresh token on each refresh; invalidate the old one)
- [ ] Cleanup of expired refresh tokens (scheduled job or on-use check)
- [ ] **Rate limiting** on `/register` and `/login` (e.g. `express-rate-limit`)
- [ ] Startup **env validation** with Zod (fail loudly if `JWT_SECRET`, `DATABASE_URL`, etc. are missing)

---

## 🟢 Nice-to-have (polish / production-grade)
- [ ] Likes / reactions on posts
- [ ] Tags or categories for posts
- [ ] Automated tests (Vitest/Jest + Supertest) — currently none
- [ ] API docs (Swagger / OpenAPI)
- [ ] Graceful shutdown (close DB pool on SIGTERM) + structured logging
- [ ] CI (lint + typecheck + test on push)

---

## Definition of "complete"
**Minimal complete app** = sections 1–4 (core CRUD + comments).
**Solid/production-leaning** = also section 5.
Everything under 🟢 is optional growth.

---

## How to verify after each change
```bash
docker compose up -d        # Postgres on :5434
npm run db:migrate          # after any schema change
npm run dev                 # tsx watch on :3000
npm run build               # typecheck must pass
```
Then exercise endpoints with curl/Postman and test the guards:
non-owner edit/delete → `403`, missing id → `404`, empty PATCH body → `422`.
