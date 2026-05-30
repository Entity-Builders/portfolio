# X drafts: Maestro + Expo: The Real Gotchas Guide

Source: https://juanobrach.dev/blog/maestro-e2e-expo-gotchas/
Date: 2026-05-17
Suggested tags: #Maestro #E2E #Testing #Expo #ReactNative #iOS #Automation #Mobile

Editorial angle: Mobile E2E testing fails in environment details, not just test syntax.

> These are drafts, not auto-posted copy. Re-running the generator rewrites this file.

## Single-post drafts

### Draft 1 (237 chars)

Mobile E2E testing usually fails in the margins: autocorrect, keyboard focus, hidden views, dev-client state.

I wrote up the real Maestro + Expo gotchas from an iOS happy-path test.

https://juanobrach.dev/blog/maestro-e2e-expo-gotchas/

### Draft 2 (236 chars)

A Maestro test that should have been "login -> create budget -> done" turned into a tour of iOS edge cases.

The fixes were less about syntax and more about making the app testable.

https://juanobrach.dev/blog/maestro-e2e-expo-gotchas/

### Draft 3 (218 chars)

One thing mobile E2E taught me again: if a view is 0x0 or opacity:0, your test may not see it even if your brain does.

Notes from debugging Maestro + Expo on iOS:

https://juanobrach.dev/blog/maestro-e2e-expo-gotchas/

## Thread draft

### Post 1/4 (172 chars)

1/4 Mobile E2E testing is not just "write a script and press play". The hard part is the environment: keyboard state, autocorrect, dev-client overlays, accessibility trees.

### Post 2/4 (190 chars)

2/4 In our Expo iOS flow, Maestro hit errors that looked random: email input corruption, keyboard dismissal failures, invisible readiness markers, and taps that did not focus the real input.

### Post 3/4 (199 chars)

3/4 The fixes were mostly product/testability fixes: stable test IDs, explicit keyboard handling, no hidden 0x0 readiness views, conditional flows for the Expo launcher, and deterministic auth seams.

### Post 4/4 (90 chars)

4/4 I wrote the full breakdown here: https://juanobrach.dev/blog/maestro-e2e-expo-gotchas/
