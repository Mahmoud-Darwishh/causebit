# Portfolio Projects Setup Guide

## Overview
Your portfolio system is now ready! Here's how to add your actual projects.

## File Structure
```
public/
  projects/
    ecommerce/
      hero.jpg
      dashboard.jpg
      checkout.jpg
    saas/
      demo.mp4
      thumbnail.jpg
      analytics.jpg
    ... (one folder per project)
```

## Adding Your Projects

### Step 1: Create Project Folders
Create folders in `public/projects/` for each project:
- Use kebab-case naming (e.g., `my-project-name`)
- Each folder should contain all media for that project

### Step 2: Add Media Files
For each project, add:
- **Images**: Screenshots, mockups, designs (JPG, PNG, WebP)
- **Videos**: Demo videos, screen recordings (MP4)
- **Thumbnails**: For video projects, add a poster image

Recommended image dimensions:
- Hero/Main images: 1200x800px
- Detail screenshots: 1920x1080px
- Thumbnails: 600x400px

### Step 3: Update Project Data
Edit `data/projects.ts`:

```typescript
{
  id: '1',
  slug: 'your-project-slug',
  type: 'live', // or 'video', 'case-study', 'design'
  category: ['web', 'ecommerce'], // Choose from: web, mobile, uiux, ecommerce, saas, dashboard
  titleKey: 'projects.items.yourproject.title',
  descriptionKey: 'projects.items.yourproject.description',
  liveUrl: 'https://your-client-website.com', // For live projects
  media: [
    {
      type: 'image', // or 'video'
      url: '/projects/your-project/screenshot1.jpg',
      alt: 'Description of image'
    },
    // Add more media...
  ],
  technologies: ['Next.js', 'React', 'Node.js'], // Tech stack
  year: 2025,
  featured: true, // Show on homepage
  testimonial: { // Optional
    textKey: 'projects.items.yourproject.testimonial',
    author: 'Client Name',
    role: 'CEO, Company Name'
  }
}
```

### Step 4: Add Translations
Edit `messages/en.json` and `messages/ar.json`:

```json
"projects": {
  "items": {
    "yourproject": {
      "title": "Your Project Name",
      "description": "Brief description of the project",
      "testimonial": "Optional client quote"
    }
  }
}
```

## Project Types Explained

### 1. `type: 'live'`
- For **active client websites**
- Include `liveUrl` field
- Users can click to visit the live site
- Example: Currently running e-commerce stores

### 2. `type: 'video'`
- For projects with **demo videos**
- Perfect for acquired companies (no longer live)
- Video plays on hover in grid
- Add multiple screenshots alongside video

### 3. `type: 'case-study'`
- For **detailed project documentation**
- Multiple screenshots and explanations
- Great for mobile apps and complex projects

### 4. `type: 'design'`
- For **UI/UX work**, design systems, Figma files
- Show design mockups, style guides, components
- Highlight visual design skills

## Categories

Mix and match these categories for each project:
- **web**: Web applications, websites
- **mobile**: iOS, Android, React Native apps
- **uiux**: Interface design, user experience work
- **ecommerce**: Online stores, shopping platforms
- **saas**: Software-as-a-Service products
- **dashboard**: Admin panels, analytics platforms

## Adding Videos

### Option 1: Self-Hosted
1. Export video as MP4 (H.264 codec)
2. Keep file size under 50MB (compress if needed)
3. Place in `/public/projects/your-project/`
4. Create a thumbnail image (same name + .jpg)

```typescript
media: [
  {
    type: 'video',
    url: '/projects/my-project/demo.mp4',
    thumbnail: '/projects/my-project/demo-thumb.jpg'
  }
]
```

### Option 2: External (YouTube, Vimeo)
For larger videos, host externally and embed iframe in project detail page.

## Best Practices

### Image Optimization
- Use WebP format when possible
- Compress images (TinyPNG, Squoosh)
- Max file size: 500KB per image
- Use descriptive alt text

### Project Descriptions
- Keep descriptions concise (2-3 sentences)
- Highlight key features and results
- Mention technologies used
- Add measurable outcomes if available

### Featured Projects
- Mark your best 3-4 projects as `featured: true`
- These appear on the homepage Portfolio section
- Choose diverse project types

## Example: Adding a Real Project

Let's say you have a live e-commerce site for "ABC Store":

1. **Create folder**: `public/projects/abc-store/`

2. **Add images**:
   - `hero.jpg` (homepage screenshot)
   - `product-page.jpg`
   - `checkout.jpg`

3. **Update `data/projects.ts`**:
```typescript
{
  id: 'abc-store',
  slug: 'abc-store',
  type: 'live',
  category: ['web', 'ecommerce'],
  titleKey: 'projects.items.abcstore.title',
  descriptionKey: 'projects.items.abcstore.description',
  liveUrl: 'https://abcstore.com',
  media: [
    {
      type: 'image',
      url: '/projects/abc-store/hero.jpg',
      alt: 'ABC Store Homepage'
    },
    {
      type: 'image',
      url: '/projects/abc-store/product-page.jpg',
      alt: 'Product Details Page'
    }
  ],
  technologies: ['Shopify', 'React', 'Tailwind CSS'],
  year: 2025,
  featured: true
}
```

4. **Add translations** in `messages/en.json`:
```json
"abcstore": {
  "title": "ABC Store - Fashion E-commerce",
  "description": "Modern e-commerce platform with seamless checkout and inventory management. Achieved 150% increase in online sales."
}
```

## Tips for Acquired Companies

If a company was acquired and the site is down:
- Use `type: 'video'` or `type: 'case-study'`
- Remove `liveUrl` field
- Add screen recordings or multiple screenshots
- Explain the project outcome in description
- Consider adding "✓ Successfully Acquired" badge in testimonial

## Need Help?

If you need assistance adding specific projects:
1. Provide project details
2. Share screenshots/videos
3. Tell me the project type and story
4. I'll help format the data structure

Your portfolio is live at: `/en/projects` and `/ar/projects`
