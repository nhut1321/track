# TrackStats Dashboard - Design Guidelines

## Design Approach
**System**: Material Design with gaming dashboard influences (Discord/Steam aesthetics)
**Rationale**: Data-heavy inventory tracking tool requires clear information hierarchy, scannable tables, and efficient data visualization. Gaming context calls for modern, clean interface that feels native to the Roblox ecosystem.

## Typography System
- **Headings**: Inter or Roboto
  - H1 (Dashboard title): text-3xl font-bold
  - H2 (Section headers): text-xl font-semibold
  - H3 (Card titles): text-lg font-medium
- **Body**: text-base for data, text-sm for metadata/timestamps
- **Monospace**: For numerical values (inventory counts, IDs) - use font-mono

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section margins: mb-6, mb-8
- Gap between elements: gap-4, gap-6

**Grid Structure**:
- Dashboard container: max-w-7xl mx-auto px-4
- Stats cards: 3-column grid on desktop (grid-cols-1 md:grid-cols-3)
- Main inventory table: Full-width responsive

## Core Components

### Header/Navigation (h-16)
- Logo/title: "TrackStats Dashboard" (left-aligned)
- Live status indicator with pulse animation
- Total accounts counter badge
- Refresh button (right-aligned)

### Stats Overview Cards (3-column grid, mb-8)
Each card (rounded-lg, shadow-md, p-6):
1. **Total Accounts** - Large number with icon
2. **Online Players** - With percentage indicator
3. **Total Items Tracked** - Aggregate sum of all inventories

### Main Data Table
**Structure**: Responsive table with sticky header
**Columns**:
- ID (w-16)
- Username (font-medium)
- Status (Online/Offline badge with dot indicator)
- Type (badge component)
- Legendary Fish Bait (text-right, font-mono)
- Legendary Fruit Chest (text-right, font-mono)
- Mythical Fruit Chest (text-right, font-mono)
- Last Updated (text-sm, relative time)
- Actions (icon button for details/edit)

**Table Styling**:
- Alternating row backgrounds for readability
- Hover state on rows
- Compact mode: py-3 px-4 per cell
- Sticky header with shadow on scroll
- Empty state: centered message with icon when no data

### Update Form Modal/Panel
**Layout**: Slide-in panel from right (w-96) or centered modal
**Fields** (each mb-4):
- Username input (required)
- Type dropdown/select
- Three number inputs for inventory items
- Submit button (full-width, h-12)
- Cancel button (ghost style)

### Status Badges
- Online: Small dot indicator (h-2 w-2) + "Online" text
- Offline: Gray dot + "Offline" text
- Type badges: Rounded-full px-3 py-1 text-sm

### Empty States
- No data illustration/icon
- "No accounts tracked yet" heading
- "Start tracking by adding your first account" subtext
- Primary CTA button

## Interaction Patterns

**Data Loading**:
- Skeleton loaders for table rows during fetch
- Shimmer effect on stat cards while loading

**Real-time Updates**:
- Toast notifications for successful updates (bottom-right, slide-in)
- Error states inline with form fields

**Table Interactions**:
- Sort by clicking column headers (with arrow indicators)
- Search/filter bar above table (sticky)
- Pagination if >20 accounts (bottom-aligned)

## Responsive Behavior

**Desktop (lg+)**: Full table with all columns visible
**Tablet (md)**: Hide "Type" and "List Class" columns, show in expandable row
**Mobile**: Card-based layout instead of table
- Each account = card (mb-4)
- Stack information vertically
- Swipe actions for edit/delete

## Critical Layout Rules
- No forced viewport heights - let content flow naturally
- Dashboard uses natural height with py-8 padding on main container
- Vertical rhythm: consistent mb-6 between major sections
- No floating elements in empty space
- Table should feel grounded with proper container max-width

## Performance Considerations
- Virtualize table if >100 rows
- Debounce search input (300ms)
- Optimistic UI updates when posting data
- Cache API responses with 30s stale time

This dashboard prioritizes data clarity, quick scanning, and efficient inventory management without unnecessary visual noise.