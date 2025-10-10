# Codemagic EXPO_TOKEN Setup Guide

## 🎯 Quick Setup Steps

### Step 1: Add Environment Variable in Codemagic Dashboard

1. **Go to Codemagic Dashboard**
   - Navigate to your app: `Demo_app`
   - Click on **"Settings"** tab
   - Click on **"Environment variables"**

2. **Add New Variable**
   - Click **"+ Add variable"**
   - Fill in the details:
     - **Variable name**: `EXPO_TOKEN`
     - **Variable value**: `kW4v...` (your actual EAS token)
     - **Secure**: ✅ **Check this box** (important!)
     - **Group**: `expo` (optional, but recommended for organization)

3. **Save the Variable**
   - Click **"Save"**
   - The variable should now appear in your environment variables list

### Step 2: Verify Your codemagic.yaml Configuration

Your `codemagic.yaml` should already be configured correctly:

```yaml
workflows:
  expo-ios-eas:
    environment:
      vars:
        EXPO_TOKEN: $EXPO_TOKEN # This references the variable you just created
```

### Step 3: Start Build

1. **Go to Builds**
   - Click on **"Builds"** tab
   - Click **"Start new build"**
   - Select workflow: **"expo-ios-eas"**
   - Click **"Start build"**

## 🔍 Troubleshooting

### If Build Still Fails:

1. **Check Variable Name**
   - Make sure it's exactly `EXPO_TOKEN` (case-sensitive)
   - No spaces or extra characters

2. **Check Token Value**
   - Make sure you copied the complete token starting with `kW4v...`
   - No extra spaces at the beginning or end

3. **Check Secure Flag**
   - Make sure the "Secure" checkbox is checked
   - This encrypts the token value

4. **Verify Group (Optional)**
   - If you created a group called `expo`, make sure it's properly configured

## 📋 Expected Build Flow

Once properly configured, your build should:

1. ✅ **Install dependencies** (npm install)
2. ✅ **Install EAS CLI** (npm install -g eas-cli)
3. ✅ **Authenticate with EAS** (npx eas whoami should show your username)
4. ✅ **Build iOS app** (npx eas build -p ios --profile development)
5. ✅ **Generate .ipa file** (downloadable from Codemagic)

## 🚨 Important Notes

- **Token Format**: Your token starts with `kW4v...` (this is correct for EAS tokens)
- **Variable Name**: Must be `EXPO_TOKEN` (EAS CLI requirement)
- **Security**: Always mark as "Secure" to encrypt the token
- **Access**: Use `$EXPO_TOKEN` in codemagic.yaml to reference the variable

## 🎉 Success Indicators

- `npx eas whoami` shows your Expo username (not "Not logged in")
- Build proceeds to iOS compilation step
- No "Unauthorized Error" messages
- Final .ipa file is generated and downloadable
