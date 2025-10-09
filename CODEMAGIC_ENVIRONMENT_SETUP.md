# Codemagic Environment Variables Setup Guide

## 🚨 **Issue Fixed**
The build failed because `Encrypted(...)` placeholders were used instead of actual environment variables.

## 🔧 **How to Fix in Codemagic Dashboard**

### Step 1: Go to App Settings
1. **Open your Codemagic dashboard**
2. **Select your Demo_app project**
3. **Click "App settings"** in the left sidebar
4. **Click "Environment variables"**

### Step 2: Add Required Environment Variables

#### **EXPO_TOKEN** (Required for Expo builds)
- **Variable name**: `EXPO_TOKEN`
- **Variable value**: Your actual Expo access token
- **Group**: `expo`
- **Secure**: ✅ (Check this box to encrypt the value)

#### **How to get your Expo token:**
1. Go to https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Click "Create new token"
3. Give it a name (e.g., "Codemagic CI")
4. Copy the generated token
5. Add it to Codemagic as `EXPO_TOKEN`

### Step 3: Optional Variables (for advanced builds)

#### **Apple Developer Credentials** (for iOS builds)
- `APPLE_ID`: Your Apple Developer account email
- `APPLE_PASSWORD`: Your Apple Developer password (use app-specific password)
- `TEAM_ID`: Your Apple Developer Team ID

#### **App Store Connect API** (for TestFlight distribution)
- `ASC_API_KEY`: Your App Store Connect API key (.p8 file content)
- `ASC_KEY_ID`: Your App Store Connect API key ID
- `ASC_ISSUER_ID`: Your App Store Connect API issuer ID

## 🚀 **Available Workflows After Setup**

### **For Testing (Recommended First):**
```yaml
Workflow: expo-development
Purpose: Development build for testing
Requirements: EXPO_TOKEN only
```

### **For Web Builds:**
```yaml
Workflow: expo-web
Purpose: Web deployment
Requirements: No special credentials needed
```

### **For Production:**
```yaml
Workflow: expo-production-basic
Purpose: Production iOS build
Requirements: EXPO_TOKEN + Apple Developer account
```

## 📋 **Step-by-Step Setup Process**

### 1. Get Expo Token
```bash
# Option 1: Web interface
# Go to https://expo.dev/accounts/[username]/settings/access-tokens

# Option 2: CLI (if you have expo CLI installed)
expo login
expo whoami
```

### 2. Add to Codemagic
1. **Dashboard** → **App settings** → **Environment variables**
2. **Add variable**:
   - Name: `EXPO_TOKEN`
   - Value: `[your-expo-token]`
   - Secure: ✅
   - Group: `expo`

### 3. Test Build
1. **Go to "Builds"** in Codemagic
2. **Click "Start new build"**
3. **Select "expo-development" workflow**
4. **Start build**

## 🎯 **Recommended First Build**

Start with the **expo-development** workflow because:
- ✅ Only requires EXPO_TOKEN
- ✅ Fastest build time
- ✅ Good for testing your setup
- ✅ No Apple Developer account needed

## 🔍 **Troubleshooting**

### **If build still fails:**
1. **Check environment variables** are properly set in Codemagic
2. **Verify EXPO_TOKEN** is valid and not expired
3. **Try expo-web workflow first** (no credentials needed)

### **Common Issues:**
- **Invalid token**: Generate a new Expo token
- **Wrong variable name**: Must be exactly `EXPO_TOKEN`
- **Secure not checked**: Make sure "Secure" is checked for sensitive data

## 📱 **After Successful Build**

1. **Download the .ipa file** from build artifacts
2. **Test on device** using TestFlight or direct installation
3. **Set up Apple Developer account** for production builds
4. **Configure App Store Connect** for distribution

## 🎉 **Next Steps**

Once your first build succeeds:
1. **Set up Apple Developer account** ($99/year)
2. **Configure iOS certificates** in Codemagic
3. **Add App Store Connect integration**
4. **Create production builds** for App Store submission

Your repository is ready - just add the `EXPO_TOKEN` environment variable in Codemagic! 🚀
