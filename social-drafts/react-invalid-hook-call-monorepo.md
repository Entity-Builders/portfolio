# X drafts: Anatomy of an 'Invalid Hook Call' in Monorepos: React's Silent Killer

Source: https://juanobrach.dev/blog/react-invalid-hook-call-monorepo/
Date: 2026-05-15
Suggested tags: #React #Debugging #Architecture #Monorepo #YarnWorkspaces

Editorial angle: A tiny workspace dependency shape can create a phantom React instance.

> These are drafts, not auto-posted copy. Re-running the generator rewrites this file.

## Single-post drafts

### Draft 1 (267 chars)

Invalid Hook Call is often blamed on broken hook rules. In monorepos, the scarier cause is two Reacts in memory.

I wrote about the Yarn Workspace dependency shape that creates the phantom React instance.

https://juanobrach.dev/blog/react-invalid-hook-call-monorepo/

### Draft 2 (273 chars)

React hooks depend on a singleton. If a shared package brings its own React, Metro can wire your app to one dispatcher and your package to another.

That is how a harmless devDependency becomes a runtime crash.

https://juanobrach.dev/blog/react-invalid-hook-call-monorepo/

### Draft 3 (234 chars)

The fix for our Invalid Hook Call was not changing component code. It was deleting React from a shared package's devDependencies and letting peerDependencies do their job.

https://juanobrach.dev/blog/react-invalid-hook-call-monorepo/

## Thread draft

### Post 1/4 (156 chars)

1/4 The scary version of "Invalid Hook Call" is when no hook rule is broken. In a workspace, a small package.json choice can create a second React instance.

### Post 2/4 (177 chars)

2/4 Shared packages should describe React as a peer contract. If they install their own local React, the app renderer and imported components can speak to different dispatchers.

### Post 3/4 (163 chars)

3/4 The practical checklist: inspect yarn why react, remove misleading devDependencies, delete local node_modules, reinstall, and restart Metro with a clean cache.

### Post 4/4 (88 chars)

4/4 Full monorepo autopsy: https://juanobrach.dev/blog/react-invalid-hook-call-monorepo/
