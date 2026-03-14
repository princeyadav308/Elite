---
description: Design system reference — approved styling tokens for all ELITE/FlexHub pages
---

# ELITE Design System — Approved Tokens

> **Source of truth:** `OnboardingLayout.jsx` + `GymIdentityStep1.jsx` (approved Feb 10 2026).
> Every new page MUST follow these tokens exactly.

---

## Font

- **Family:** `'Plus Jakarta Sans', sans-serif` (set on root wrapper)
- **Icons:** Google Material Symbols Outlined (`material-symbols-outlined`)

---

## Colors

| Token | Value | Usage |
|---|---|---|
| **Accent (primary)** | `#00d09c` | Buttons, active states, icons, borders, progress bars |
| **Accent hover** | `emerald-600` / `hover:opacity-90` | Links, interactive elements |
| **Accent bg** | `emerald-50` | Active step circle bg, selected chip bg |
| **Background gradient** | `linear-gradient(135deg, #c7d2fe 0%, #a7f3d0 50%, #bae6fd 100%)` | Page background, `backgroundAttachment: fixed` |
| **Card bg** | `#f8fafc` | Main content card |
| **Sidebar bg** | `bg-slate-100/60` | Sidebar panel |
| **Input bg** | `bg-white` | All form inputs |
| **Body text** | `#0f172a` (`text-slate-900`) | Headings, input text |
| **Secondary text** | `text-slate-700` | Labels, descriptions |
| **Muted text** | `text-slate-600` | Progress text, step completion |
| **Placeholder text** | `text-slate-400` | Input placeholders |
| **Inactive step text** | `text-slate-500` | Non-active sidebar steps |
| **Border** | `border-slate-300` | Inputs, inactive step circles |
| **Section divider** | `border-slate-200` | Section header borders, sidebar border |
| **Shadow (card)** | `0 20px 40px -12px rgba(0,0,0,0.12), 0 8px 20px -8px rgba(0,0,0,0.08)` | Main card |
| **Shadow (button)** | `shadow-xl shadow-emerald-200` | Primary CTA button |

---

## Typography Scale

| Element | Classes |
|---|---|
| **Page title** | `text-3xl font-extrabold text-slate-900 uppercase tracking-tight` |
| **Page description** | `text-base text-slate-700 mt-2` |
| **Section heading** | `text-base font-extrabold text-slate-900 uppercase tracking-widest` |
| **Section icon** | `text-[#00d09c] text-xl` (Material Symbols) |
| **Form label** | `text-[12px] font-extrabold text-slate-700 uppercase tracking-widest mb-2` |
| **Input text** | `text-base text-slate-900` |
| **Helper / hint text** | `text-xs text-slate-500` |
| **Checkbox label** | `text-sm font-bold text-slate-800 uppercase tracking-wide` |
| **Footer note** | `text-xs text-slate-600 font-bold uppercase tracking-widest` |

### Sidebar Typography

| Element | Classes |
|---|---|
| **Sidebar heading** | `text-2xl font-extrabold text-slate-900` |
| **Sidebar description** | `text-base text-slate-600 mt-1 leading-relaxed` |
| **Step labels** | `text-sm uppercase tracking-wider font-semibold` |
| **Progress label** | `text-xs font-bold text-slate-500 uppercase tracking-widest` |
| **Progress status** | `text-sm text-slate-600 mt-2 font-medium` |

---

## Form Inputs

```jsx
// Reuse these constants at the top of every step page:
const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base text-slate-900 focus:ring-[#00d09c] focus:border-[#00d09c] transition-all placeholder:text-slate-400 outline-none";
const labelClass = "block text-[12px] font-extrabold text-slate-700 uppercase tracking-widest mb-2";
```

---

## Components

### Section Header
```jsx
<div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-200">
    <span className="material-symbols-outlined text-[#00d09c] text-xl">{iconName}</span>
    <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-widest">{title}</h3>
</div>
```

### Primary Button (CTA)
```jsx
<button className="w-full md:w-auto md:px-12 bg-[#00d09c] text-white py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-emerald-200 hover:opacity-90 transition-all flex items-center justify-center gap-3">
    {label}
    <span className="material-symbols-outlined">arrow_forward</span>
</button>
```

### Toggle Chip (Unselected)
```jsx
<button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:border-[#00d09c] hover:text-[#00d09c] transition-all" type="button">{label}</button>
```

### Toggle Chip (Selected)
```jsx
<button className="px-3 py-1.5 rounded-lg border border-[#00d09c] text-xs font-bold text-[#00d09c] bg-emerald-50" type="button">{label}</button>
```

### File Upload Zone
```jsx
<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-white hover:bg-slate-50 transition-colors cursor-pointer">
    {/* content */}
</div>
```

---

## Layout

- **Container max-width:** `120rem` (inline style)
- **Card border-radius:** `24px`
- **Card border:** `1px solid rgba(255,255,255,0.9)`
- **Grid:** `grid-cols-1 lg:grid-cols-12` — sidebar `col-span-3`, content `col-span-9`
- **Content padding:** `p-8 lg:p-12`
- **Sidebar padding:** `p-8`
- **Section spacing:** `space-y-12` between form sections
- **Field gap:** `gap-6` within grids

---

## Sidebar Step Indicator

### Active Step
```jsx
// Circle: border-[#00d09c] bg-emerald-50 text-slate-800
// Text: text-[#00d09c]
```

### Completed Step
```jsx
// Circle: border-[#00d09c] bg-[#00d09c] text-white (with check icon)
```

### Inactive Step
```jsx
// Circle: border-slate-300 bg-white text-slate-600
// Text: text-slate-500
```

- Circle size: `w-9 h-9 rounded-full border-2 text-sm font-bold`

---

## Navigation Bar
- `bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50`
- Logo icon: `w-10 h-10 bg-[#00d09c] rounded-xl text-white shadow-lg shadow-emerald-200`
- Brand name: `text-2xl font-extrabold tracking-tight text-slate-800`

## Footer
- Links: `text-xs font-semibold text-slate-500 hover:text-[#00d09c]`
- Copyright: `text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]`
