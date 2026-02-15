# Firebase Storage Setup Guide

## Problem Summary

Your app was experiencing audio disconnection issues because Firebase Storage download URLs contain **authentication tokens that expire** after a certain period (typically 1-7 days). When these tokens expired, the audio would stop working until you redeployed the app, which triggered fresh URL generation.

## The Solution

We've implemented a **two-layer fix**:

### 1. Code Improvements ✅ (Already Done)

- **Periodic URL Refresh**: URLs are automatically refreshed every 6 hours
- **Smart Error Recovery**: If an audio URL fails to play, the app automatically fetches a fresh URL and retries
- **Better Logging**: Console messages show when URLs are loaded and refreshed

### 2. Firebase Storage Rules (You Need to Do This)

Make your `/audio` folder publicly readable so download URLs **never expire**.

---

## How to Update Firebase Storage Rules

### Step 1: Go to Firebase Console

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **phonicspal-tcb**

### Step 2: Navigate to Storage Rules

1. Click **"Storage"** in the left sidebar (under "Build" section)
2. Click the **"Rules"** tab at the top

### Step 3: Update the Rules

Replace the existing rules with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // ✅ PUBLIC: Allow anyone to READ audio files
    // ❌ PROTECTED: Only authenticated users can WRITE/DELETE
    match /audio/{audioFile} {
      allow read: if true;           // Anyone can download audio
      allow write: if false;         // No one can upload via client
      allow delete: if false;        // No one can delete via client
    }

    // 🔒 Block all other paths by default
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 4: Publish

1. Click **"Publish"** button at the top
2. Confirm the changes

---

## What This Does

### Before (With Auth Tokens)
```
URL: https://firebasestorage.googleapis.com/...?token=abc123&expires=2024-01-15
     └─ Stops working after expiry ❌
```

### After (Public Read Access)
```
URL: https://firebasestorage.googleapis.com/...
     └─ Works permanently ✅
```

### Security Notes

✅ **Safe for your app** because:
- Phonics audio is **educational content** (not private data)
- Anyone who uses your app should be able to hear the audio
- Write access is still **blocked** - random users can't upload files
- Only you (via your code) can upload audio using your Firebase credentials

❌ **Don't use public rules for**:
- User-generated content
- Private recordings
- Sensitive data

---

## Testing After Rules Update

### Option 1: Browser Console Test

1. Open your deployed app
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Run this:

```javascript
// Pick any audio ID from your app (e.g., 'b', 'short_a', etc.)
const testUrl = await getAudioURLFromFirebase('b');
console.log(testUrl);
```

5. Copy the URL, open an **incognito window**, and paste the URL directly
6. If audio plays in incognito → ✅ Rules are working (no auth needed)

### Option 2: Real-World Test

1. Open your app
2. Leave it open for 24+ hours
3. Try playing audio again
4. If it still works → ✅ URLs are permanent

---

## Rollback (If Needed)

If you need to revert to authenticated access, use:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /audio/{audioFile} {
      allow read: if request.auth != null;  // Require login
      allow write: if false;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Additional Notes

- **Environment Variables**: Your Firebase credentials in `.env` are safe to keep
- **Existing Audio**: All existing audio files will automatically use the new rules
- **New Uploads**: When teachers upload new audio via the app, it will also be publicly readable
- **Cost**: Public read access doesn't increase costs - you already pay for bandwidth when users play audio

---

## Questions?

If you see errors after updating rules:
1. Check the **"Usage"** tab in Firebase Storage to verify files exist
2. Try clearing your browser cache
3. Redeploy your app one last time to clear any old cached URLs

**Your code is now resilient** - even if you forget to update the rules, the automatic refresh and retry logic will keep audio working!
