# Adnan Khan Realty - Real Estate Website

A high-end, real estate website for Adnan Khan, a premier realtor serving Cambridge, Ontario and surrounding areas.

### Pages

1. **Homepage**
   - Full-width hero section with strong CTAs
   - Featured luxury listings
   - About Adnan preview section
   - Client testimonials carousel
   - Lead capture form

2. **About Page**
   - Professional story and background
   - Core values and mission
   - Market expertise and statistics
   - Cambridge & Ontario market knowledge

3. **Listings Page**
   - Filterable property grid (All, For Sale, Sold)
   - Luxury listing cards with hover effects
   - Property details and statistics

4. **Buyers Page**
   - Step-by-step buying process
   - Benefits of working with Adnan
   - First-time buyer information
   - Expert negotiation and market insights

5. **Sellers Page**
   - Home valuation information
   - Strategic marketing approach
   - Selling process overview
   - Professional photography and digital marketing

6. **Tools Page**
   - **Mortgage Calculator**: Calculate monthly payments based on home price, down payment, interest rate, and amortization period
   - **Home Evaluation Tool**: Request a free home value report with property details

7. **Contact Page**
   - Contact form with multiple fields
   - Office location and hours
   - Interactive map of Cambridge, Ontario
   - Direct contact information

## Design Style

The website takes direct inspiration from premium realtor sites including:
- Toronto's Finest Homes
- Troy Palmquist
- Indigo Road Realty
- The Gambino Group
- Norluxe Realty
- Juliette Hohnen

### Design Elements

- **Color Palette**: Charcoal, deep navy, gold (#D4AF37), and white space
- **Typography**: Thin serif headings (Playfair Display) with modern sans-serif body text
- **Layout**: Clean, spacious, elegant luxury aesthetic
- **Animations**: Smooth scroll, refined hover effects, and transitions
- **Photography**: Large high-quality hero images throughout

## Technology Stack

- **Framework**: Astro 5.x
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Deployment**: Cloudflare Workers
- **Language**: TypeScript

## Features

- Fully responsive design for all devices
- Interactive mortgage calculator
- Home evaluation request form
- Professional navigation with mobile menu
- Testimonials carousel
- Property filtering system
- Contact forms with validation
- SEO-optimized structure

## Getting Started

### Development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── MortgageCalculator.tsx
│   │   ├── HomeEvaluation.tsx
│   │   └── ...
│   ├── layouts/         # Astro layouts
│   │   └── main.astro
│   ├── pages/           # File-based routing
│   │   ├── index.astro  # Homepage
│   │   ├── about.astro
│   │   ├── listings.astro
│   │   ├── buyers.astro
│   │   ├── sellers.astro
│   │   ├── tools.astro
│   │   └── contact.astro
│   ├── lib/
│   │   └── base-url.ts  # Base URL configuration
│   └── styles/
│       └── global.css   # Global styles and luxury theming
```

## Key Components

### Mortgage Calculator
- Home price input
- Down payment calculation
- Interest rate adjustment
- Amortization period selection
- Real-time payment calculation
- Total interest and total paid display

### Home Evaluation Tool
- Property address input
- Property type selection
- Bedroom/bathroom count
- Additional comments field
- Free value report request

### Navigation
- Sticky header with scroll effect
- Desktop and mobile responsive
- All major pages linked
- Smooth transitions

### Footer
- Quick links
- Services overview
- Contact information
- Social media links
- Multi-column layout

## Luxury Features

- Professional photography placeholders (replace with real images)
- Gold accent color (#D4AF37) throughout
- Smooth scroll behavior
- Hover effects on all cards and images
- Custom scrollbar styling
- Premium typography hierarchy
- Spacious section padding
- Elegant transitions and animations

## Customization

### Colors
The primary gold accent can be changed by updating `#D4AF37` throughout the components, or by modifying the Tailwind configuration.

### Typography
Fonts are configured in `src/styles/global.css`:
- Heading font: Playfair Display (serif)
- Body font: System sans-serif stack
- Button font: System sans-serif stack

### Content
All text content can be edited directly in the component files. Images use Unsplash placeholders - replace with actual property photos.

## Navigation Structure

- Home → Featured listings, about preview, testimonials
- About → Full bio, values, expertise
- Listings → All properties with filtering
- Buyers → Process, benefits, first-time buyer info
- Sellers → Valuation, marketing, selling process
- Tools → Mortgage calculator, home evaluation
- Contact → Form, map, contact details

## Contact Information

Update the following in the components:
- Phone: (555) 123-4567
- Email: adnan@adnankhanrealty.com
- Location: Cambridge, Ontario, Canada
- Social media links (currently placeholder)

## Brand Colors

- Primary Gold: `#D4AF37`
- Hover Gold: `#B8941F`
- Dark Background: `#1a1a1a`
- Medium Background: `#2a2a2a`
- Light Background: `#f8f8f8`
- White: `#ffffff`

## License

All rights reserved - Adnan Khan Realty

---

Built with for real estate excellence
