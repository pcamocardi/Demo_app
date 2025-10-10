# EAS iOS Credentials Setup Guide

## 🎯 Current Status
- ✅ Authentication working (`pcamocardi (authenticated using EXPO_TOKEN)`)
- ✅ expo-dev-client installed
- ❌ Missing iOS credentials for code signing

## 📋 Two Options for iOS Credentials

### Option 1: Use Expo's Managed Credentials (Recommended for Development)

This is the easiest option - Expo will manage the certificates for you.

1. **Run EAS Setup Interactively:**
   ```bash
   cd Demo_App
   npx eas build:configure
   ```

2. **When prompted:**
   - Select "iOS" platform
   - Choose "Let EAS manage all credentials" (recommended)
   - This will automatically create certificates for you

### Option 2: Use Your Own Apple Developer Account

If you have an Apple Developer account ($99/year):

1. **Add Apple Developer Account to EAS:**
   ```bash
   cd Demo_App
   npx eas credentials
   ```

2. **Configure iOS Credentials:**
   - Select "iOS" platform
   - Choose "I want to use my own Apple Developer account"
   - Follow prompts to set up certificates

## 🚀 Quick Fix for Current Issue

Since you're in non-interactive mode in Codemagic, let's update the build profile to use managed credentials:

### Update eas.json

```json
{
  "cli": {
    "version": ">= 16.0.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium",
        "credentialsSource": "auto"
      }
    }
  }
}
```

## 🔧 Alternative: Use Preview Build Instead

If you want to avoid credential setup for now, try using the "preview" profile instead:

```bash
npx eas build -p ios --profile preview --non-interactive
```

Preview builds don't require the same level of code signing as development builds.

## 📱 What Each Build Profile Does

- **development**: Requires full code signing, can install on devices for development
- **preview**: Simpler signing, good for testing, can be distributed via TestFlight
- **production**: Full App Store signing, for App Store submission

## 🎉 Next Steps

1. **Try preview build first:**
   - Update codemagic.yaml to use `--profile preview`
   - This might work without additional credential setup

2. **Or set up credentials:**
   - Run `npx eas build:configure` locally
   - Let EAS manage credentials automatically

## 🚨 Important Notes

- **Apple Developer Account**: Not required for Expo managed credentials
- **Code Signing**: EAS can handle this automatically
- **Distribution**: Development builds can be installed on devices via Expo Go or direct installation
