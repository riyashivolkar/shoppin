# 🛍️ Shoppin'



🌐 **Live Site:** [shoppin-blush.vercel.app](https://shoppin-blush.vercel.app/)

---

## 🔧 Features

### ✅ Layout
- **Header Image:** Styled similar to Google's official website (for `lg` and `md` screens).
- **Fidget & Feed Components:** Visible only on `lg` and `md` devices, inspired by the Google web layout.
- **Google Sign-In:** Authentication uses Google OAuth.

---

### 🧠 Image Search Lens
- Works smoothly on `sm` (mobile) devices.
- Includes:
  - Real-time camera capture
  - Image upload from gallery
  - Cropping tool
  - Future-ready for integration with image recognition APIs
- ⚠️ **Note:** Responsiveness for `md` and `lg` devices in this feature can be improved.

---

## 🔌 APIs Used

- **MediaStack API** — Used in `Feed` component for `md` and `lg` devices.
- **NewsAPI** — Used in `Feed` component for `sm` (mobile) devices.

📌 **Next Task:**  
- [ ] Generate new API key for **MediaStack** for production.

---

## 🖥️ Cross-Platform Compatibility

- ✅ Fully responsive and tested across major modern browsers.
- ✅ Cross-device (desktop and mobile) optimized.

---

---

## ⚠️ Disadvantages / Things To Improve

- ❌ **Image Search Lens responsiveness on `md` and `lg` screens** is limited and needs refinement.
- ❌ No backend or real AI integration yet for image recognition — currently a UI simulation.
- ❌ Results are hardcoded — no dynamic results based on uploaded images.
- ❌ Error handling and loading feedback in the UI can be improved.
- ❌ Needs enhancements in animation and user experience polish.

---

## 🧪 Tech Stack

- **React.js** with modular components
- **Tailwind CSS** for responsive styling
- **Framer Motion** for animations
- **React Webcam** for camera access
- **Firebase Auth** for Google Sign-In
- **Vercel** for deployment

---

## 🙌 Author

Built by **Riya** — a Google UI clone experiment and responsive design challenge.

---

THANK YOU