# Phonics Pal - Project Export & Merge Guide

**Generated:** 2025-12-31
**Repository:** https://github.com/starlightGR-steve/phonics-pal
**Live App:** https://phonics-pal-grlc.vercel.app/
**Current Branch:** main
**Latest Commit:** a35bb65

---

## Project Overview

**Phonics Pal** is a React-based educational app for teaching phonics to children. It features:
- Interactive flashcards for phonics sounds (consonants, vowels, digraphs, blends)
- AI-generated audio using Google's Generative AI API
- Custom audio recording capability
- Dual storage system: Firebase Cloud Storage + IndexedDB (local browser storage)
- Grid and stack view modes for flashcards
- Customizable audio settings (speed, pitch, voice selection)

---

## Recent Changes Summary

### Commit History
1. **7ab91a9** - Initial commit: Phonics Pal with Tailwind CSS
2. **4fb90d4** - Add Firebase Storage integration for cloud audio hosting
3. **a35bb65** - Secure Firebase credentials with environment variables (LATEST)

### Changes Since Initial Commit
- Added Firebase SDK (v12.7.0)
- Created Firebase Storage integration
- Added cloud/local storage toggle in Settings UI
- Implemented environment variable security for API keys
- Created comprehensive setup documentation

---

## Project Structure

```
PhonicsPal/
├── .env                      # Local environment variables (NOT in git)
├── .env.example              # Template for environment variables
├── .gitignore                # Updated to exclude .env files
├── FIREBASE_SETUP.md         # Firebase setup and deployment guide
├── PROJECT_EXPORT.md         # This file
├── README.md                 # Original project README
├── package.json              # Dependencies (includes firebase ^12.7.0)
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx              # React app entry point
    ├── index.css             # Tailwind CSS
    ├── App.jsx               # Main app component (HEAVILY MODIFIED)
    ├── firebase.js           # Firebase initialization (uses env vars)
    ├── firebaseStorage.js    # Firebase Storage helper functions
    └── assets/
        └── react.svg
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "firebase": "^12.7.0",
    "lucide-react": "^0.554.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "vite": "^7.2.4",
    // ... other dev dependencies
  }
}
```

---

## Firebase Configuration

### Project Details
- **Project ID:** phonicspal-tcb
- **Business Account:** steve@starlightgr.com
- **Auth Domain:** phonicspal-tcb.firebaseapp.com
- **Storage Bucket:** phonicspal-tcb.firebasestorage.app
- **Messaging Sender ID:** 143159830132
- **App ID:** 1:143159830132:web:34f0670433f3e8c7299321

### Environment Variables Required

**Local Development (.env file):**
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=phonicspal-tcb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=phonicspal-tcb
VITE_FIREBASE_STORAGE_BUCKET=phonicspal-tcb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=143159830132
VITE_FIREBASE_APP_ID=1:143159830132:web:34f0670433f3e8c7299321
```

**Vercel Deployment:**
Same variables must be configured in Vercel dashboard under Settings → Environment Variables

### Firebase Storage Rules
```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /audio/{audioId} {
      allow read: if true;
      allow write, delete: if true; // For production, add auth
    }
  }
}
```

---

## Major Code Changes

### 1. src/firebase.js (NEW FILE)
```javascript
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Uses environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
```

### 2. src/firebaseStorage.js (NEW FILE)
Firebase Storage helper functions:
- `uploadAudioToFirebase(id, blob)` - Upload audio to cloud
- `getAudioURLFromFirebase(id)` - Retrieve download URL
- `deleteAudioFromFirebase(id)` - Delete audio file
- `listAllAudioFiles()` - List all uploaded files
- `audioExistsInFirebase(id)` - Check file existence

### 3. src/App.jsx (MAJOR MODIFICATIONS)

#### New Imports
```javascript
import { Cloud, HardDrive } from 'lucide-react';
import { uploadAudioToFirebase, getAudioURLFromFirebase, deleteAudioFromFirebase, listAllAudioFiles } from './firebaseStorage';
```

#### New State Variable
```javascript
const [useFirebase, setUseFirebase] = useState(true); // Toggle between Firebase and IndexedDB
```

#### Modified Functions
1. **loadCustomAudio (useEffect)** - Lines 306-343
   - Checks `useFirebase` flag
   - Loads from Firebase Storage OR IndexedDB based on toggle

2. **generateAIAudio** - Lines ~390-400
   - Uploads generated audio to Firebase when `useFirebase === true`
   - Falls back to IndexedDB when `useFirebase === false`

3. **startRecording (mediaRecorder.onstop)** - Lines ~420-434
   - Uploads recorded audio to Firebase when enabled
   - Falls back to IndexedDB when disabled

4. **deleteRecording** - Lines 444-463
   - Deletes from Firebase or IndexedDB based on storage mode

#### New UI Component - Storage Toggle (Lines ~747-778)
```javascript
<div>
  <label className="text-sm font-semibold text-slate-700 mb-3 block">Storage Location</label>
  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
    <button onClick={() => setUseFirebase(false)}>
      <HardDrive className="w-4 h-4" />
      Local
    </button>
    <button onClick={() => setUseFirebase(true)}>
      <Cloud className="w-4 h-4" />
      Cloud
    </button>
  </div>
</div>
```

### 4. .gitignore (UPDATED)
Added environment variable exclusions:
```
# Environment variables
.env
.env.local
.env.*.local
```

---

## API Integrations

### Google Generative AI
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`
- **Purpose:** Text-to-speech audio generation
- **Model:** gemini-2.0-flash-exp
- **Voice:** Puck (clear, child-friendly)

### Firebase Storage
- **Bucket:** phonicspal-tcb.firebasestorage.app
- **Path Pattern:** `audio/{id}.webm`
- **File Format:** WebM audio

---

## Deployment Configuration

### Vercel Setup
1. **Project:** phonics-pal
2. **Connected Repo:** https://github.com/starlightGR-steve/phonics-pal
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Framework:** Vite

### Environment Variables in Vercel
Must configure all 6 Firebase environment variables (see Firebase Configuration section above).

**Important:** After configuring environment variables, trigger a redeploy for changes to take effect.

---

## Known Issues & Security Notes

### 1. Exposed API Key (RESOLVED)
- **Issue:** Original Firebase API key was hardcoded in commit 4fb90d4
- **Status:** Fixed in commit a35bb65 by moving to environment variables
- **Action Required:** Regenerate the exposed API key in Google Cloud Console
- **Exposed Key:** AIzaSyDLLxVTW3iD9ejGY1tKU9Y4M8VldxE7jU4 (COMPROMISED)

### 2. API Key Restrictions Needed
The Firebase API key should have:
- **Application restrictions:** HTTP referrers
  - `localhost:*`
  - `https://phonics-pal-grlc.vercel.app/*`
  - `https://*.vercel.app/*`
- **API restrictions:** Firebase Storage API only

### 3. Production Security
Current Firebase Storage rules allow unrestricted write access. For production, implement Firebase Authentication and update rules:
```javascript
allow write, delete: if request.auth != null;
```

---

## Data Model

### Phonic Cards (PHONIC_DATA array)
Each card contains:
- `id` - Unique identifier (string)
- `letter` - Display letter(s)
- `word` - Example word
- `image` - Emoji representation
- `type` - Category: 'consonant' | 'vowel' | 'digraph' | 'blend' | 'r-controlled' | 'diphthong' | 'trigraph'
- `voiceOver` - Audio script for AI generation
- `why` - (optional) Explanation for rule variations

**Total Cards:** 100+ phonics sounds

### Custom Recordings State
```javascript
customRecordings = {
  [cardId]: audioURL, // URL string (Firebase URL or Blob URL)
  // Example:
  "b": "https://firebasestorage.googleapis.com/.../b.webm",
  "a_short": "blob:http://localhost:5173/..."
}
```

---

## Testing Checklist

### Local Development
- [ ] Create `.env` file with Firebase credentials
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test Local storage mode (Settings → Local)
- [ ] Test Cloud storage mode (Settings → Cloud)
- [ ] Test AI audio generation
- [ ] Test custom audio recording
- [ ] Test audio deletion
- [ ] Verify audio persists after page refresh

### Production Deployment
- [ ] Configure environment variables in Vercel
- [ ] Deploy to Vercel
- [ ] Verify Firebase Storage rules are published
- [ ] Test audio upload/download on live site
- [ ] Check Firebase Console for uploaded files
- [ ] Test cross-device access (Cloud storage)

---

## Merge Instructions

### If Merging With Parallel Development:

1. **Compare Dependencies**
   - Check if parallel branch added/updated any packages
   - Resolve conflicts in `package.json` and `package-lock.json`
   - Run `npm install` after merge

2. **Firebase Integration Files**
   - `src/firebase.js` - NEW (this branch)
   - `src/firebaseStorage.js` - NEW (this branch)
   - Ensure these files exist in merged version

3. **App.jsx Changes**
   - Lines 2: Added `Cloud, HardDrive` icons
   - Lines 3: Added Firebase Storage imports
   - Line 281: Added `useFirebase` state
   - Lines 306-343: Modified `loadCustomAudio` logic
   - Lines 390-400: Modified `generateAIAudio` to upload to Firebase
   - Lines 420-434: Modified recording upload logic
   - Lines 444-463: Modified `deleteRecording` to support dual storage
   - Lines 747-778: Added Storage Location toggle UI
   - **Strategy:** If parallel branch heavily modified App.jsx, manually integrate Firebase logic

4. **Environment Variables**
   - Ensure `.env` is in `.gitignore`
   - Create `.env` file locally (not committed)
   - Update Vercel with environment variables

5. **Documentation**
   - Keep `FIREBASE_SETUP.md`
   - Keep `.env.example`
   - Merge or combine README files

6. **Git Commit Messages Pattern**
   - All commits include Claude Code attribution:
     ```
     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
     ```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## File Exports

### Complete File Listing
See "Project Structure" section above.

### Modified Files (commits 4fb90d4 → a35bb65)
1. `.env.example` - NEW
2. `.gitignore` - MODIFIED (added env exclusions)
3. `FIREBASE_SETUP.md` - NEW
4. `package.json` - MODIFIED (added firebase dependency)
5. `package-lock.json` - MODIFIED (firebase packages)
6. `src/App.jsx` - MODIFIED (145 line changes)
7. `src/firebase.js` - NEW
8. `src/firebaseStorage.js` - NEW

### Unchanged Core Files
- `src/main.jsx` - No changes
- `src/index.css` - No changes
- `index.html` - No changes
- `vite.config.js` - No changes
- `eslint.config.js` - No changes

---

## Contact & Resources

- **GitHub Repository:** https://github.com/starlightGR-steve/phonics-pal
- **Live Application:** https://phonics-pal-grlc.vercel.app/
- **Firebase Project:** phonicspal-tcb
- **Firebase Account:** steve@starlightgr.com
- **Vercel Account:** (linked to GitHub)

---

## Next Steps After Merge

1. **Regenerate Firebase API Key**
   - Go to Google Cloud Console
   - Delete/regenerate the exposed key
   - Add API restrictions
   - Update `.env` and Vercel environment variables

2. **Test Full Integration**
   - Clone merged repository
   - Set up environment variables
   - Test all features locally
   - Deploy to Vercel
   - Verify production functionality

3. **Optional Enhancements**
   - Add Firebase Authentication
   - Implement production security rules
   - Add user accounts for personalized audio libraries
   - Add analytics tracking

---

**End of Export Document**
