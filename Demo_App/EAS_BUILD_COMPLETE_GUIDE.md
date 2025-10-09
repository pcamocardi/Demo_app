# Complete EAS Build Configuration Guide

## Current Status
- ✅ EAS CLI installed and logged in
- ✅ eas.json configuration file created
- ✅ Project structure ready
- ❌ Apple Developer account not configured
- ❌ EAS project not fully initialized

## Step-by-Step Configuration

### 1. Complete EAS Project Initialization
Run this command in your terminal:
```bash
npx eas init
```
When prompted, answer:
- Project name: `Demo_App` (or keep default)
- Confirm project creation: `Y`

### 2. Apple Developer Account Setup (Required for iOS)

#### Option A: Get Apple Developer Account (Recommended)
1. Visit: https://developer.apple.com/programs/
2. Sign up for Apple Developer Program ($99/year)
3. Complete verification process
4. Note your Team ID from the developer portal

#### Option B: Use Free Apple ID (Limited)
- You can use a free Apple ID for development builds only
- Limited to 3 apps and 10 days expiration
- Cannot distribute or submit to App Store

### 3. Configure Credentials
After getting Apple Developer account:
```bash
npx eas credentials
```
Select:
- Platform: `iOS`
- Profile: `development`
- Credential type: `Build Credentials`

### 4. Create Your First Build

#### For Development Testing:
```bash
npx eas build --platform ios --profile development
```

#### For Preview/Internal Distribution:
```bash
npx eas build --platform ios --profile preview
```

#### For Production/App Store:
```bash
npx eas build --platform ios --profile production
```

## Alternative: Web Builds (No Apple Account Required)

### Configure for Web:
```bash
npx eas build --platform web --profile production
```

### Configure for Android (No Apple Account Required):
```bash
npx eas build --platform android --profile development
```

## Troubleshooting

### If you get "No team associated" error:
1. Ensure you have a paid Apple Developer account
2. Check your Apple ID is associated with a developer team
3. Try using a different Apple ID that has developer access

### If project initialization fails:
```bash
# Clear EAS cache
npx eas build:clear-cache

# Reinitialize
npx eas init
```

## Next Steps After Configuration

1. **Test with Expo Go first** (no build required):
   ```bash
   npx expo start
   ```

2. **Create development build** (requires Apple account):
   ```bash
   npx eas build --platform ios --profile development
   ```

3. **Install on device** using the provided link

## Cost Considerations

- **Apple Developer Program**: $99/year (required for iOS)
- **EAS Build**: Free tier available (limited builds per month)
- **Expo Go**: Free (for development testing)

## Recommendation

Start with **Expo Go** for immediate testing, then get Apple Developer account for production builds.
