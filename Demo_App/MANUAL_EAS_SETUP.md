# Manual EAS Project Setup

## Option 1: Interactive Setup (Recommended)
```bash
npx eas build:configure
```
This will create the project and configure build settings.

## Option 2: Direct Project Creation
```bash
npx eas project:create
```

## Option 3: Check Current Status
```bash
npx eas project:info
```

## After Project Creation:
```bash
# Configure credentials
npx eas credentials

# Create first build
npx eas build --platform ios --profile development
```

## Troubleshooting:
- If you get "project not configured" errors, run `npx eas build:configure` first
- Make sure you're in the correct directory (Demo_App)
- Ensure you're logged in with `npx eas login`
