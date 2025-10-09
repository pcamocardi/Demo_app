# EAS Build Setup for iOS - Demo_App

## ✅ Completed Setup
- EAS CLI is installed (version 16.20.4)
- `eas.json` configuration file created
- iOS bundle identifier configured: `com.pcamocardi.demoapp`

## 🔐 Next Steps (Manual Login Required)

### 1. Login to EAS
```bash
npx eas login
```
You'll be prompted to enter your Expo account email/username and password.

### 2. Configure Apple Developer Account
```bash
npx eas credentials
```
This will guide you through setting up your Apple Developer account credentials.

### 3. Create iOS Development Build
```bash
npx eas build --platform ios --profile development
```

### 4. Create iOS Production Build
```bash
npx eas build --platform ios --profile production
```

## 📱 Build Profiles Explained

### Development Profile
- Creates a development client build
- Allows you to test your app with Expo Dev Client
- Can be installed on devices without App Store

### Preview Profile
- Creates an internal distribution build
- Good for testing with TestFlight or internal distribution
- Requires Apple Developer account

### Production Profile
- Creates a production-ready build
- Ready for App Store submission
- Requires Apple Developer account and app review

## 🔧 Configuration Files

### eas.json
- Contains build profiles and settings
- Resource class set to "m-medium" for faster builds
- Development client enabled for development profile

### app.json
- iOS bundle identifier: `com.pcamocardi.demoapp`
- Supports both iPhone and iPad
- Configured with Expo Router

## 📋 Prerequisites

1. **Expo Account**: Sign up at https://expo.dev if you don't have one
2. **Apple Developer Account**: Required for iOS builds (paid membership)
3. **Xcode**: Not required for EAS Build (handled by Expo's servers)

## 🚀 Quick Start Commands

```bash
# Navigate to Demo_App directory
cd Demo_App

# Login to EAS (interactive)
npx eas login

# Configure credentials
npx eas credentials

# Build for iOS development
npx eas build --platform ios --profile development

# Build for iOS production
npx eas build --platform ios --profile production
```

## 📖 Additional Resources
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [iOS Build Guide](https://docs.expo.dev/build/ios-builds/)
- [Apple Developer Setup](https://docs.expo.dev/build/ios-builds/#apple-developer-account)
