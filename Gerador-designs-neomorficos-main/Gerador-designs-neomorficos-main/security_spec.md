# Security Specification - NeuStudio

## Data Invariants
- A design preset cannot exist without a valid `authorId` that matches the authenticated user.
- A design preset must have exactly the required neumorphic settings fields.
- `createdAt` is immutable after creation.
- `updatedAt` must be set to the server timestamp on every write.
- User profiles can only be managed by the owner.

## The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to create a preset with `authorId` of another user.
2. **Key Injection**: Attempt to create a preset with extra fields (e.g., `isVerified: true`).
3. **Invalid Types**: Attempt to set `intensity` as a string instead of a number.
4. **Boundary Violation**: Attempt to set `intensity` to 5.0 (max allowed is 0.3).
5. **ID Poisoning**: Attempt to use a 2MB string as a preset ID.
6. **Immutable Violation**: Attempt to change `createdAt` on update.
7. **Bypassing Auth**: Attempt to read private presets without being signed in.
8. **PII Leak**: Attempt to list all users to scrape emails.
9. **State Shortcutting**: Attempt to set a custom role in the user profile.
10. **Query Scraper**: Attempt to list all presets without filtering by `isPublic` or `authorId`.
11. **Shadow Update**: Attempt to update someone else's preset by guessing the ID.
12. **Resource Exhaustion**: Attempt to create 10,000 document writes in a single batch (limited by rules/quota).

## Test Runner Plan
I will create `firestore.rules` that prevent these attacks using the "Eight Pillars".
