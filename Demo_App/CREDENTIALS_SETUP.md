# Apple Developer Credentials Setup

## Option 1: Interactive Setup (Recommended)
```bash
npx eas credentials
```

## Option 2: Environment Variables
Set these environment variables in your terminal:

```bash
# For Apple ID
export APPLE_ID="your-apple-id@example.com"

# For App Store Connect API Key (optional, for automated builds)
export APPLE_APP_SPECIFIC_PASSWORD="your-app-specific-password"

# For Apple Team ID (found in Apple Developer portal)
export APPLE_TEAM_ID="YOUR_TEAM_ID"
```

## Option 3: Manual Credential Management
```bash
# List current credentials
npx eas credentials

# Configure iOS credentials specifically
npx eas credentials --platform ios

# Configure distribution certificate
npx eas credentials --platform ios --type distribution

# Configure provisioning profile
npx eas credentials --platform ios --type provisioning-profile
```

## Required Information:
1. **Apple Developer Account**: Active paid membership ($99/year)
2. **Apple ID**: Your Apple Developer account email
3. **Team ID**: Found in Apple Developer portal under "Membership"
4. **Bundle Identifier**: Already configured as `com.pcamocardi.demoapp`

## Troubleshooting:
- If you get "No Apple Developer account" error, ensure you have an active paid membership
- If certificate creation fails, try using "Build Credentials" instead of "Distribution"
- For first-time setup, start with development builds before production
