# DESIGN.md: Vietnam Airlines

## Source
- URL: https://www.vietnamairlines.com/vn/vi/
- Capture date: 2026-05-23
- Evidence: web scrape of page content, structure, navigation, and visual patterns

## Design Summary

Vietnam Airlines uses a premium airline aesthetic: dark navy/teal header overlaid transparently on full-bleed hero banners, golden lotus branding, clean white content areas, and a structured information hierarchy. The design conveys trust, elegance, and Vietnamese cultural identity through gold accents and lotus motifs.

## Design Tokens

### Colors

| Role | Value | Notes |
|------|-------|-------|
| Primary Teal | `#008080` | Main brand color, nav bar, buttons, active states |
| Teal Dark | `#006666` | Hover states, darker accents |
| Gold | `#B8860B` | CTA buttons, badges, section borders, lotus logo |
| Gold Light | `#DAA520` | Hover gold, subtitle text on dark backgrounds |
| Navy | `#1A2B4A` | Footer background, dark overlays |
| Navy Dark | `#0F1B2D` | Footer bottom, deepest backgrounds |
| White | `#FFFFFF` | Content backgrounds, text on dark |
| Gray Background | `#F5F5F5` | Section alternating backgrounds |
| Gray Text | `#666666` | Body text, descriptions |
| Gray Light | `#999999` | Dates, captions, meta text |
| Border | `#E5E5E5` | Input borders, dividers |
| Black Overlay | `rgba(0,0,0,0.3-0.7)` | Hero banner overlays, header backdrop |

### Typography

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Font Family | Noto Sans, Helvetica, Arial, sans-serif | — | — | System-safe, clean |
| Nav Items | — | 500 | 13px | Uppercase not used, sentence case |
| Hero Title | — | 700 | 36-42px | Bold, tight leading |
| Hero Subtitle | — | 500 | 12-14px | Uppercase, letter-spacing: 2px, gold color |
| Section Heading | — | 700 | 22px | Navy color |
| Body Text | — | 400 | 13-14px | Gray #666 |
| Small/Meta | — | 400 | 11px | Gray #999 |
| Button Text | — | 600 | 13px | Uppercase on primary actions |
| Tab Labels | — | 600 | 10-12px | Uppercase, teal when active |

### Spacing And Layout

| Token | Value |
|-------|-------|
| Max content width | 1200px |
| Page padding (horizontal) | 16px mobile, 24px desktop |
| Section vertical padding | 40-48px |
| Card gap | 16px |
| Input height | ~44px (py-3) |
| Header height | 60px |
| Hero height | 500px mobile, 650px desktop |
| Border radius | 0 (sharp edges throughout — no rounded corners) |
| Box shadow | Minimal — only on dropdowns and hover cards |
| Divider style | 1px solid #E5E5E5 or white/10 in footer |

## Components

### Header / Navigation
- Position: absolute, overlays hero banner
- Background: `rgba(0,0,0,0.3)` with `backdrop-blur-sm`
- Logo: Golden lotus SVG icon + "VIETNAM AIRLINES" white text
- Nav items: white text, 13px, medium weight, horizontal
- Dropdown: white bg, `border-top: 3px solid gold`, shadow-2xl
- Right side: search icon, user login, language selector (flag + "VI")
- Mobile: hamburger menu, full-width white dropdown

### Hero Banner / Slider
- Full-width, full-bleed images (travel/destination photography)
- Dark gradient overlay: `from-black/70 via-black/40 to-transparent` (left to right)
- Content aligned left, max-width ~500px
- Subtitle: gold, uppercase, tracking-widest, 12px
- Title: white, bold, 36-42px, multi-line
- CTA button: gold background, white text, no border-radius, arrow icon
- Slide indicators: numbered squares (01, 02, 03...), gold when active
- Navigation arrows: semi-transparent white squares on left/right edges
- Auto-advances every 5 seconds

### Booking Form (Flight Search)
- Sits directly below hero (not overlapping)
- Tab bar: "MUA VÉ | QUẢN LÝ ĐẶT CHỖ | LÀM THỦ TỤC"
- Active tab: teal text + 3px bottom border teal
- Trip type: radio buttons (Khứ hồi / Một chiều)
- Class selector: dropdown (Phổ thông / Phổ thông đặc biệt / Thương gia)
- Input fields: no border-radius, 1px gray border, 13px text, teal focus border
- Swap button: circular, teal border, teal icon
- Search button: teal background, white text, uppercase, right-aligned

### Service Tabs ("Trọn vẹn trải nghiệm")
- Gray background section
- Horizontal icon tabs: icon + uppercase label below
- Active tab: teal color + 3px bottom border + white background
- Content: grid of cards with title (bold, 12px) + description
- Cards: white bg, border, hover shadow + teal border accent

### News ("Tin nhanh")
- Gold vertical bar accent before heading
- List items: date (gray, 11px) + title (13px)
- Dividers between items
- Hover: teal text color

### Promotion Cards
- Image top (160px height, object-cover, hover scale effect)
- Gold tag badge (top-left)
- Title: 13px semibold, hover teal
- Price: 14px bold gold
- No border-radius on cards

### Footer
- Background: navy-dark (#0F1B2D)
- 5 columns: Vietnam Airlines, Hỗ Trợ, Pháp Lý, Thông Tin Hữu Ích, Vận Tải Hàng Hóa
- Column headings: gold-light, 12px, uppercase, bold
- Links: 11px, white/60 opacity, hover gold
- Social icons: colored squares (FB blue, YT red, IG pink, TT black)
- Awards bar: bordered badges with award names
- Bottom: centered legal text, 10px, white/40

## Page Patterns

### Section Order (Homepage)
1. Header (transparent overlay)
2. Hero banner slider (full-bleed)
3. Flight search form (white, tabbed)
4. Services tabs (gray background)
5. News ticker / announcements (white)
6. Promotions grid (white)
7. Newsletter signup (optional)
8. Footer (dark navy)

### Responsive Behavior
- Header collapses to hamburger on mobile
- Hero maintains aspect ratio, text scales down
- Booking form stacks vertically on mobile
- Service tabs scroll horizontally on mobile
- Promo grid: 1 col mobile → 2 col tablet → 4 col desktop
- Footer: 2 col mobile → 5 col desktop

## Content Style

- **Voice**: Formal, respectful ("Quý khách"), professional airline tone
- **CTA style**: Action-oriented, short ("Khám phá ngay", "Mua ngay", "Tìm chuyến bay")
- **Headings**: Vietnamese, sentence case or uppercase for tabs/labels
- **Copy density**: Medium — concise descriptions, no long paragraphs on homepage
- **Language**: Vietnamese primary, with English codes (HAN, SGN, PNR)

## Agent Build Instructions

1. Use sharp edges (no border-radius) throughout — this is a key VNA visual trait
2. Header must be `position: absolute` overlaying the hero with semi-transparent dark background
3. Use the exact teal (#008080) and gold (#B8860B) — these are the two signature colors
4. Hero banners need real destination photography with left-aligned dark gradient overlay
5. Booking form tabs use underline indicator (not filled tabs)
6. All buttons are rectangular (no rounded corners), teal or gold
7. Typography is clean and small (13-14px body, never larger than 42px for headings)
8. Footer is very dark navy with gold headings and low-opacity white text
9. Maintain generous whitespace between sections (40-48px vertical padding)
10. Use numbered slide indicators (01, 02, 03) not dots

## Rerun Inputs

workflow: firecrawl-website-design-clone
source_url: https://www.vietnamairlines.com/vn/vi/
target_stack: React + Tailwind CSS + Vite
output: DESIGN.md
