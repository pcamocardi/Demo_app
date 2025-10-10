# Setup EAS Credentials Locally

## 🎯 The Issue
EAS needs to set up iOS credentials interactively first before they can be used in non-interactive CI/CD mode.

## 🚀 Solution: Set Up Credentials Locally First

### Step 1: Run Credentials Setup Locally

Run this command on your local machine (not in Codemagic):

```bash
cd Demo_App
npx eas credentials
```

When prompted, you'll see options like:
1. Select **"iOS"** platform
2. You might see options like:
   - **"Set up new credentials"** or **"Create new credentials"**
   - **"Use existing credentials"** 
   - **"Auto-generate credentials"** or **"Generate credentials automatically"**
3. Choose the option that lets EAS create/manage credentials automatically
4. Let EAS create certificates and provisioning profiles automatically

### Step 2: Verify Credentials

After setup, verify credentials exist:

```bash
npx eas credentials --platform ios
```

You should see your certificates and provisioning profiles listed.

### Step 3: Test Build Locally (Optional)

Test that credentials work:

```bash
npx eas build -p ios --profile development --non-interactive
```

### Step 4: Push to GitHub

Once credentials are set up locally, push your changes and try the Codemagic build again.

## 🔧 Alternative: Use Preview Profile

If you want to avoid credential setup entirely, I've already updated the codemagic.yaml to use the "preview" profile instead of "development". Preview builds have simpler credential requirements.

## 📱 Build Profile Differences

- **development**: Requires full credential setup, for development testing
- **preview**: Simpler setup, good for testing, can be distributed via TestFlight
- **production**: Full App Store signing, for App Store submission

## 🎉 Next Steps

1. **Try preview build first** (already configured)
2. **Or set up credentials locally** using the commands above
3. **Then try development build** in Codemagic

The preview build should work without the credential setup issues you're experiencing.
