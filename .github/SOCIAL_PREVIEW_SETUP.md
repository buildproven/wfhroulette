# Social Preview Setup Guide

This guide explains how to set up social preview images for GitHub and web sharing.

## Web Sharing (Open Graph)

✅ **Already configured!** The website now includes:

- Open Graph image: `/web/og-image.svg`
- Meta tags for Facebook, Twitter/X, LinkedIn, etc.
- Proper dimensions: 1200x630px (recommended)

When you share `https://buildproven.ai`, it will display the dice logo with branding.

### Testing Web Sharing

Use these tools to preview:

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter/X**: https://cards-dev.twitter.com/validator
- **LinkedIn**: Share the URL and check preview
- **General**: https://www.opengraph.xyz/

## GitHub Repository Social Preview

GitHub uses a custom social preview image that appears when sharing the repository link.

### Current Status

GitHub is auto-generating a generic image. To use our custom dice logo:

### Setup Instructions

#### Option 1: Upload via GitHub Web (Recommended)

1. Go to: https://github.com/buildproven/wfhroulette/settings
2. Scroll to "Social preview" section
3. Click "Edit"
4. Upload `web/og-image.svg` (or create a PNG version)
5. Click "Save"

#### Option 2: Use Existing Favicon

You can also upload the `web/favicon.svg` file as a simple preview image:

- Smaller but recognizable
- Matches brand identity
- Quick to upload

### Image Requirements

GitHub social preview images should be:

- **Minimum**: 640x320px
- **Recommended**: 1200x630px (same as Open Graph)
- **Format**: PNG, JPG, or SVG
- **Max size**: 1MB

### Converting SVG to PNG (if needed)

If GitHub doesn't accept SVG, convert using:

```bash
# Using ImageMagick (if installed)
convert -background none -size 1200x630 web/og-image.svg web/og-image.png

# Or online tools:
# - https://cloudconvert.com/svg-to-png
# - https://svgtopng.com/
```

## Verifying Setup

### Check GitHub Preview

1. Share this URL anywhere: https://github.com/buildproven/wfhroulette
2. Should show custom dice image (after you upload in settings)

### Check Web App Preview

1. Share this URL: https://buildproven.ai
2. Should show dice logo with "WFHroulette" text

## Alignment Strategy

Both previews now use the **same 5-dot dice design**:

- Favicon: Simple SVG dice
- Open Graph: Dice + branding text
- GitHub: Same as Open Graph (after manual upload)

This creates consistent branding across all platforms.

## Troubleshooting

### Image not updating?

- **Social platforms cache** images for 24-48 hours
- Use debug tools (above) to force refresh
- GitHub may take a few minutes to process

### SVG not working?

- Some platforms don't support SVG
- Convert to PNG using instructions above
- Use 1200x630px PNG for maximum compatibility

### Wrong image still showing?

- Clear social platform cache with debug tools
- Wait 24 hours for cache to expire
- Check that URLs in meta tags are correct

---

**Files Reference:**

- Web favicon: `web/favicon.svg`
- Open Graph image: `web/og-image.svg`
- Meta tags: `web/index.html` (lines 11-24)
