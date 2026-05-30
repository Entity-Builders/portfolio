# X drafts: Elevating UX: From Primitive Modals to Modern Bottom Sheets

Source: https://juanobrach.dev/blog/ui-modals-vs-bottomsheets/
Date: 2026-05-16
Suggested tags: #ReactNative #UX #UIArchitecture #BottomSheet #Animations

Editorial angle: Premium mobile UX often comes from decoupling the animation model.

> These are drafts, not auto-posted copy. Re-running the generator rewrites this file.

## Single-post drafts

### Draft 1 (267 chars)

A React Native Modal can technically work and still feel wrong.

The tell: backdrop and content slide together, making the whole interaction feel heavy. I wrote about moving that flow to Gorhom BottomSheetModal.

https://juanobrach.dev/blog/ui-modals-vs-bottomsheets/

### Draft 2 (256 chars)

Small animation details change how premium a mobile app feels.

In this write-up: why React Native's default Modal slide feels clunky, and how decoupling backdrop opacity from sheet movement fixes it.

https://juanobrach.dev/blog/ui-modals-vs-bottomsheets/

### Draft 3 (207 chars)

The fix was architectural, not cosmetic: move the sheet into a provider/portal, control it with refs, and let backdrop + content animate independently.

https://juanobrach.dev/blog/ui-modals-vs-bottomsheets/

## Thread draft

### Post 1/4 (147 chars)

1/4 A mobile interaction can be technically correct and still feel cheap. That was our React Native Modal: the backdrop and sheet slid up together.

### Post 2/4 (169 chars)

2/4 The user expects two different motions: backdrop fades in, content springs up. Coupling both into the native Modal slide animation makes the whole screen feel heavy.

### Post 3/4 (162 chars)

3/4 The fix was architectural: render sheets through a provider/portal, control them with refs, and let backdrop opacity and sheet position animate independently.

### Post 4/4 (73 chars)

4/4 Full write-up: https://juanobrach.dev/blog/ui-modals-vs-bottomsheets/
