# Circular Partner Mapping — MVP

Internal platform for a luxury group to collect, qualify, score, and recommend circular economy partners across reuse, recycling, and waste-related activities.

---

## Tech stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14, React, TypeScript       |
| Styling    | Tailwind CSS + custom CSS design system |
| State      | Zustand (client-side store)         |
| Charts     | Recharts                            |
| Forms      | React state (Hook Form ready)       |
| Auth       | Demo auth (NextAuth-ready structure)|
| Data       | In-memory seed data (Prisma-ready)  |

---

## Installation

```bash
git clone <repo>
cd circular-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo users

| Role    | Email                    | Access                                      |
|---------|--------------------------|---------------------------------------------|
| Admin   | admin@groupe-luxe.com    | Full access — all pages + settings          |
| Analyst | analyst@groupe-luxe.com  | Dashboard, directory, analyst review, form  |
| Maison  | maison@groupe-luxe.com   | Dashboard + partner directory (read only)   |
| Partner | partner@ecoloop.de       | Qualification form only                     |

Use the quick-access demo buttons on the login screen.

---

## Application structure

```
app/
  globals.css       ← Full design system (CSS variables, components)
  layout.tsx
  page.tsx          ← Entry point, login gate

lib/
  data.ts           ← All seed data, types, scoring config
  store.ts          ← Zustand global state

components/
  AppShell.tsx      ← Main layout with routing
  Sidebar.tsx       ← Navigation
  Toast.tsx         ← Notification system
  Badge.tsx         ← Level / DD / Specialty badges
  ScoreBar.tsx      ← Animated score bars
  Icons.tsx         ← SVG icon library
  pages/
    LoginPage.tsx
    Dashboard.tsx
    PartnerDirectory.tsx
    PartnerProfile.tsx
    AnalystReview.tsx
    QualificationForm.tsx
    Settings.tsx
```

---

## Scoring model

| Criterion              | Max points |
|------------------------|------------|
| Circularity expertise  | 20         |
| Technical capabilities | 15         |
| Traceability system    | 15         |
| Reporting maturity     | 10         |
| Legal registration     | 10         |
| Compliance docs        | 10         |
| Insurance certificate  | 10         |
| Governance transparency| 10         |
| **Total**              | **100**    |

### Recommendation levels

| Level | Threshold | Label                 |
|-------|-----------|-----------------------|
| A     | 85–100    | Strongly recommended  |
| B     | 70–84     | Recommended           |
| C     | 50–69     | Conditional           |
| D     | 0–49      | Limited relevance     |

---

## Sample workflow

1. **Login as Partner** → Complete the 8-step qualification form → Submit
2. **Login as Analyst** → Open Analyst review → Select partner from queue → Adjust score, add notes, approve/reject
3. **Login as Maison** → Browse directory → Filter by region/specialty/level → Open partner profile
4. **Login as Admin** → Settings → Manage users, adjust scoring thresholds, configure platform

---

## Design system

The platform uses a luxury editorial aesthetic:

- **Typography**: Cormorant Garamond (display/headings) + DM Sans (body/interface)
- **Palette**: Ivory / Parchment / Linen / Sand / Taupe / Umber / Espresso / Ink
- **Sidebar**: Deep espresso/ink with warm accent highlights
- **Cards**: White surfaces on ivory base, hairline borders
- **Badges**: Tone-on-tone, all derived from brand palette

All design tokens are defined as CSS variables in `app/globals.css`.

---

## Production hardening (next steps)

- [ ] Replace Zustand demo store with PostgreSQL + Prisma ORM
- [ ] Implement NextAuth with Microsoft Entra ID (Azure AD) for SSO
- [ ] Replace local file mock with Azure Blob Storage or S3
- [ ] Add Prisma schema (entities: User, Partner, Submission, DueDiligence, Score, Document, AuditLog)
- [ ] Implement server actions for all mutations
- [ ] Add GDPR-compliant data export and deletion flows
- [ ] Add i18n with next-intl (structure already in place)
- [ ] Add CSV export for partner directory
- [ ] Integrate PDF generation for partner reports
- [ ] Add email notifications (Resend / SendGrid)
- [ ] Add rate limiting and input sanitisation
- [ ] Deploy to Vercel or Azure App Service
