# Asset Search Guide

Complete guide to searching and using external assets (images, icons, cliparts, illustrations) in your Canvelete designs.

## Table of Contents

- [Overview](#overview)
- [Asset Sources](#asset-sources)
- [Search Tools](#search-tools)
- [Workflow](#workflow)
- [Examples](#examples)

## Overview

Canvelete provides access to multiple asset sources:

| Source | Type | Count | Tool | License |
|--------|------|-------|------|---------|
| **Pixabay** | Photos, illustrations, vectors | 2.7M+ | `search_stock_images` | Free commercial use |
| **Unsplash** | High-quality photos | 3M+ | `search_stock_images` | Free commercial use |
| **Iconify** | Icons from 150+ sets | 200K+ | `search_icons` | Varies (mostly open source) |
| **Cliparts** | Curated clipart graphics | 10K+ | `search_clipart` | Licensed for Canvelete |
| **Illustrations** | Artistic illustrations | 5K+ | `search_illustrations` | Licensed for Canvelete |

## Asset Sources

### Pixabay

**Description:** Free stock photos, illustrations, and vectors

**Best For:**
- Background images
- Product photos
- Nature and landscape photography
- Abstract backgrounds
- General purpose imagery

**Categories:**
- backgrounds, fashion, nature, science, education
- feelings, health, people, religion, places
- animals, industry, computer, food, sports
- transportation, travel, buildings, business, music

**Search Tips:**
- Use descriptive keywords: "mountain landscape sunset"
- Combine multiple keywords: "business meeting office"
- Try different variations: "mountain" vs "mountains"
- Use specific terms: "golden retriever" vs "dog"

**Example Queries:**
```
nature landscape mountains sunset
business professional office meeting
abstract background gradient blue
food restaurant cooking chef
technology computer digital workspace
people team collaboration
city skyline night lights
flowers garden spring bloom
```

### Unsplash

**Description:** High-quality, curated photography

**Best For:**
- Hero images and backgrounds
- Professional photography
- High-resolution images (up to 6000px)
- Artistic compositions

**Search Tips:**
- Prefix query with "unsplash:" for Unsplash-specific search
- Great for hero images and backgrounds
- Higher quality than typical stock photos

**Example Queries:**
```
unsplash:minimalist workspace
unsplash:urban architecture
unsplash:natural landscape
unsplash:modern interior
```

### Iconify

**Description:** Unified icon framework with 200,000+ icons from 150+ icon sets

**Best For:**
- UI icons
- Brand logos
- Symbols and pictograms
- Scalable vector graphics

**Popular Icon Sets:**

| Collection | Name | Count | Style |
|-----------|------|-------|-------|
| `mdi` | Material Design Icons | 7000+ | Google Material Design |
| `fa6-solid` | Font Awesome 6 Solid | 1400+ | Solid filled icons |
| `fa6-regular` | Font Awesome 6 Regular | 160+ | Outlined icons |
| `fa6-brands` | Font Awesome 6 Brands | 460+ | Brand logos |
| `lucide` | Lucide Icons | 1000+ | Clean, consistent |
| `heroicons` | Heroicons | 450+ | Tailwind CSS icons |
| `tabler` | Tabler Icons | 4500+ | Stroke-based |
| `ph` | Phosphor Icons | 6000+ | Flexible, modern |
| `carbon` | Carbon Icons | 2000+ | IBM Design |
| `ri` | Remix Icons | 2400+ | Neutral, elegant |
| `ion` | Ionicons | 1300+ | Ionic Framework |
| `bi` | Bootstrap Icons | 1800+ | Bootstrap design |

**Categories:**
- arrows, business, communication, devices, editing
- files, finance, food, health, home, maps
- media, nature, people, shopping, social, sports
- technology, transportation, weather

**Search Tips:**
- Icons are SVG format - add as type "svg" element
- Use `search_icons` tool to find icons
- Icons scale perfectly at any size
- Use `objectFit: "contain"` to maintain aspect ratio

**Example Queries:**
```
home house building
user person profile avatar
settings gear cog configuration
arrow chevron direction
check checkmark tick success
close x delete remove
menu hamburger navigation
search magnify find
heart like favorite love
star rating bookmark
email mail message
phone call contact
calendar date schedule
clock time
download save
upload cloud
```

### Cliparts

**Description:** Curated clipart library hosted on assets.canvelete.com

**Best For:**
- Certificates and awards
- Badges and seals
- Decorative elements
- Professional business graphics
- Educational illustrations

**Categories:**
- business, education, nature, technology, people
- food, travel, sports, animals, holidays
- arrows, banners, borders, frames, icons
- badges, ribbons, seals, certificates, awards
- decorative, ornaments, flourishes, dividers

**Special Features:**
- High-quality vector graphics
- Consistent style across collections
- Perfect for certificates and badges
- Professional business graphics
- Educational illustrations

**Search Tips:**
- Cliparts are high-quality SVG/PNG assets
- Great for certificates, badges, and decorative elements
- Use for consistent branding and professional designs
- Search by category or keyword
- Combine with text for complete designs

**Example Queries:**
```
certificate border gold
award ribbon blue
decorative frame elegant
business icon professional
education graduation cap
badge seal official
banner ribbon
corner ornament
divider line decorative
```

### Illustrations

**Description:** Artistic illustrations and vector graphics

**Best For:**
- Hero sections and feature graphics
- Storytelling and concepts
- Landing pages and presentations
- Infographics

**Categories:**
- abstract, business, technology, people, nature
- education, healthcare, finance, marketing, lifestyle

**Styles:**
- flat design, isometric, line art, hand-drawn
- minimalist, colorful, monochrome, 3D style

**Example Queries:**
```
business team collaboration
technology innovation
education learning online
healthcare medical
finance investment
```

## Search Tools

### search_stock_images

Search for stock photos from Pixabay or Unsplash.

**Parameters:**
- `query` (required): Search query
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Results per page (default: 20)

**Usage:**
```json
{
  "query": "mountain landscape",
  "page": 1,
  "perPage": 20
}
```

**Prefix Options:**
- No prefix or `photo:` - Pixabay photos
- `unsplash:` - Unsplash photos
- `illustration:` - Pixabay illustrations

### search_icons

Search for icons from Iconify.

**Parameters:**
- `query` (required): Search query
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Results per page (default: 20)

**Usage:**
```json
{
  "query": "home",
  "page": 1,
  "perPage": 20
}
```

**Prefix Options:**
- `icon:` or `iconify:` - Iconify icons

### search_clipart

Search for clipart from Canvelete clipart library.

**Parameters:**
- `query` (required): Search query
- `tag` (optional): Category tag filter
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Results per page (default: 20)

**Usage:**
```json
{
  "query": "certificate border",
  "tag": "awards",
  "page": 1,
  "perPage": 20
}
```

**Prefix Options:**
- `clipart:` or `clip:` - Clipart search

### search_illustrations

Search for illustrations.

**Parameters:**
- `query` (required): Search query
- `category` (optional): Category filter
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Results per page (default: 20)

**Usage:**
```json
{
  "query": "business team",
  "category": "business",
  "page": 1,
  "perPage": 20
}
```

**Prefix Options:**
- `illustration:` or `illustrations:` - Illustration search

## Workflow

### Complete Asset Search and Add Workflow

**Step 1: Choose Asset Type**

Decide what type of asset you need:
- Photos → `search_stock_images`
- Icons → `search_icons`
- Cliparts → `search_clipart`
- Illustrations → `search_illustrations`

**Step 2: Search for Assets**

Use the appropriate search tool with your query:

```javascript
// Example: Search for photos
search_stock_images({
  query: "mountain landscape",
  perPage: 10
})

// Example: Search for icons
search_icons({
  query: "home",
  perPage: 20
})

// Example: Search for cliparts
search_clipart({
  query: "certificate border",
  tag: "awards",
  perPage: 10
})
```

**Step 3: Review Results**

Search results include:
- URLs to the assets
- Dimensions (width, height)
- Metadata (author, tags, etc.)
- Thumbnail URLs

**Step 4: Add to Design**

Use `add_element` with the appropriate element type:

| Asset Type | Element Type | Key Properties |
|-----------|--------------|----------------|
| Photos | `image` | `src`, `objectFit: "cover"` |
| Icons | `svg` | `src`, `objectFit: "contain"` |
| Cliparts | `image` | `src`, `objectFit: "contain"` |
| Illustrations | `image` | `src`, `objectFit: "contain"` |

## Examples

### Example 1: Add Background Photo

```javascript
// Step 1: Search for photos
const results = await search_stock_images({
  query: "mountain landscape sunset",
  perPage: 5
});

// Step 2: Add selected photo to design
await add_element({
  designId: "design_id",
  element: {
    type: "image",
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    src: results.assets[0].url,
    objectFit: "cover",
    name: "background_image"
  }
});
```

### Example 2: Add Icon

```javascript
// Step 1: Search for icons
const results = await search_icons({
  query: "home",
  perPage: 10
});

// Step 2: Add selected icon to design
await add_element({
  designId: "design_id",
  element: {
    type: "svg",
    x: 50,
    y: 50,
    width: 64,
    height: 64,
    src: "https://api.iconify.design/mdi/home.svg",
    objectFit: "contain",
    name: "home_icon"
  }
});
```

### Example 3: Add Certificate Border

```javascript
// Step 1: Search for cliparts
const results = await search_clipart({
  query: "certificate border gold",
  tag: "certificates",
  perPage: 5
});

// Step 2: Add selected clipart to design
await add_element({
  designId: "design_id",
  element: {
    type: "image",
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    src: results.assets[0].url,
    objectFit: "contain",
    name: "certificate_border"
  }
});
```

### Example 4: Add Multiple Icons

```javascript
// Search for multiple icons
const homeIcon = await search_icons({ query: "home" });
const userIcon = await search_icons({ query: "user" });
const settingsIcon = await search_icons({ query: "settings" });

// Add icons in a row
const iconSize = 48;
const spacing = 80;
const startX = 100;
const y = 100;

await add_element({
  designId: "design_id",
  element: {
    type: "svg",
    x: startX,
    y: y,
    width: iconSize,
    height: iconSize,
    src: "https://api.iconify.design/mdi/home.svg",
    objectFit: "contain",
    name: "home_icon"
  }
});

await add_element({
  designId: "design_id",
  element: {
    type: "svg",
    x: startX + spacing,
    y: y,
    width: iconSize,
    height: iconSize,
    src: "https://api.iconify.design/mdi/account.svg",
    objectFit: "contain",
    name: "user_icon"
  }
});

await add_element({
  designId: "design_id",
  element: {
    type: "svg",
    x: startX + spacing * 2,
    y: y,
    width: iconSize,
    height: iconSize,
    src: "https://api.iconify.design/mdi/cog.svg",
    objectFit: "contain",
    name: "settings_icon"
  }
});
```

### Example 5: Create Certificate with Assets

```javascript
// 1. Search for certificate border
const borderResults = await search_clipart({
  query: "certificate border elegant",
  tag: "certificates"
});

// 2. Search for seal/badge
const sealResults = await search_clipart({
  query: "award seal gold",
  tag: "badges"
});

// 3. Create certificate design
const designId = "cert_design_id";

// Add background
await add_element({
  designId,
  element: {
    type: "rectangle",
    x: 0,
    y: 0,
    width: 2200,
    height: 1700,
    fill: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    name: "background"
  }
});

// Add border
await add_element({
  designId,
  element: {
    type: "image",
    x: 0,
    y: 0,
    width: 2200,
    height: 1700,
    src: borderResults.assets[0].url,
    objectFit: "contain",
    name: "border"
  }
});

// Add title
await add_element({
  designId,
  element: {
    type: "text",
    x: 200,
    y: 200,
    width: 1800,
    height: 150,
    text: "Certificate of Achievement",
    fontSize: 96,
    fontFamily: "Playfair Display",
    fontWeight: "700",
    textAlign: "center",
    fill: "#1e293b",
    name: "title"
  }
});

// Add recipient name (dynamic)
await add_element({
  designId,
  element: {
    type: "text",
    x: 200,
    y: 600,
    width: 1800,
    height: 120,
    text: "{{recipient_name}}",
    isDynamic: true,
    fontSize: 72,
    fontFamily: "Great Vibes",
    fontWeight: "400",
    textAlign: "center",
    fill: "#3b82f6",
    name: "recipient_name"
  }
});

// Add seal
await add_element({
  designId,
  element: {
    type: "image",
    x: 900,
    y: 1300,
    width: 200,
    height: 200,
    src: sealResults.assets[0].url,
    objectFit: "contain",
    name: "seal"
  }
});
```

## Tips and Best Practices

### Search Tips
1. **Be Specific:** Use descriptive keywords for better results
2. **Try Variations:** "mountain" vs "mountains", "person" vs "people"
3. **Combine Keywords:** "business meeting office" is better than just "business"
4. **Use Categories:** Filter by category/tag when available
5. **Check Multiple Sources:** Try both Pixabay and Unsplash for photos

### Usage Tips
1. **Image Sizing:** Use `objectFit: "cover"` for backgrounds, `"contain"` for logos/icons
2. **Icon Consistency:** Use icons from the same collection for visual consistency
3. **Performance:** Use appropriate image sizes (don't use 6000px images for small elements)
4. **Attribution:** While not required, consider attributing photographers when possible
5. **Licensing:** Always check license terms for commercial use

### Design Tips
1. **Backgrounds:** Use high-quality photos with `objectFit: "cover"`
2. **Icons:** Keep icon size consistent (32px, 48px, 64px are common)
3. **Cliparts:** Great for certificates, badges, and decorative elements
4. **Illustrations:** Perfect for hero sections and storytelling
5. **Layering:** Place background images first, then content, then decorative elements

## Getting Help

For more information:
- Check the metadata resource: `canvelete://api/metadata/schema`
- Use `list_fonts` to see available fonts
- Use `list_shapes` to see available shapes
- See ELEMENT_TYPES_GUIDE.md for element documentation
