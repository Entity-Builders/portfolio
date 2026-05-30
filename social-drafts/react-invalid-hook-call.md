# X drafts: Unraveling the 'Invalid Hook Call' in Monorepos

Source: https://juanobrach.dev/blog/react-invalid-hook-call/
Date: 2026-05-15
Suggested tags: #React #ReactNative #Monorepo #Debugging #YarnWorkspaces #MetroBundler

Editorial angle: A runtime hook crash caused by module resolution, not incorrect component code.

> These are drafts, not auto-posted copy. Re-running the generator rewrites this file.

## Single-post drafts

### Draft 1 (266 chars)

The worst React bugs are the ones where the component code is correct.

Our Invalid Hook Call came from dependency resolution: Metro loaded two React instances inside one app.

I wrote the diagnosis and fix here:

https://juanobrach.dev/blog/react-invalid-hook-call/

### Draft 2 (213 chars)

"Cannot read property useState of null" sounds like a hook bug. In our case, it was React losing its dispatcher because the app had duplicate module instances.

https://juanobrach.dev/blog/react-invalid-hook-call/

### Draft 3 (230 chars)

Monorepos make dependency mistakes look like runtime mysteries.

This is the anatomy of an Invalid Hook Call caused by duplicate React, and the checklist I now reach for first.

https://juanobrach.dev/blog/react-invalid-hook-call/

## Thread draft

### Post 1/4 (150 chars)

1/4 "Invalid Hook Call" is usually framed as "you broke the Rules of Hooks". Sometimes the component code is fine and the module graph is the problem.

### Post 2/4 (180 chars)

2/4 In our monorepo, Metro loaded one React instance for the app and another for a shared package. Hooks rely on a shared dispatcher, so that split made React lose its own context.

### Post 3/4 (161 chars)

3/4 The fix was dependency hygiene: React belongs in peerDependencies for shared UI packages, not as a local devDependency that can become a second runtime copy.

### Post 4/4 (81 chars)

4/4 Diagnosis and checklist: https://juanobrach.dev/blog/react-invalid-hook-call/
