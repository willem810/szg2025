# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your SZG 2025 website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard to create your account and property

## Step 2: Get Your Measurement ID

1. In your Google Analytics property, go to **Admin** (gear icon)
2. Under **Property**, click **Data Streams**
3. Click on your web stream (or create one if none exists)
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## Step 3: Update Your Code

Replace all instances of `G-XXXXXXXXXX` with your actual Measurement ID in these files:

### 1. Update `src/services/analytics.ts`
```typescript
const GA_MEASUREMENT_ID = 'G-YOUR_ACTUAL_MEASUREMENT_ID';
```

### 2. Update `index.html`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ACTUAL_MEASUREMENT_ID');
</script>
```

## Step 4: Test Your Setup

1. Run your development server: `npm run dev`
2. Open your website in a browser
3. Open the browser's Developer Tools (F12)
4. Go to the **Network** tab
5. Look for requests to `google-analytics.com` or `googletagmanager.com`
6. Check the **Console** for the message "Google Analytics initialized"

## What's Being Tracked

The following events are automatically tracked:

- **Page Views**: When users visit your website
- **Timeline Views**: When users view different years in the timeline
- **Image Clicks**: When users click on images in the gallery
- **Video Plays**: When users play videos
- **Easter Egg Interactions**: When users activate the time machine easter egg

## Privacy Considerations

- The analytics service only tracks when a valid Measurement ID is provided
- No tracking occurs in development mode unless you provide a real GA4 ID
- All tracking is done client-side and respects user privacy settings

## Troubleshooting

1. **No tracking data appearing**: Make sure you've replaced all instances of `G-XXXXXXXXXX` with your real Measurement ID
2. **Console errors**: Check that your Measurement ID is correct and your GA4 property is properly set up
3. **Development vs Production**: Analytics will work in both development and production environments

## Additional Configuration

You can customize tracking by modifying the `src/services/analytics.ts` file:

- Add new event types
- Modify existing event parameters
- Add custom dimensions or metrics
- Implement enhanced ecommerce tracking if needed

For more information, visit the [Google Analytics 4 documentation](https://developers.google.com/analytics/devguides/collection/ga4). 