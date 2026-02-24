# Social Proof PopUp & Builder - Development Tasks

- [x] **Phase 1: PopUp Core Implementation (HTML/CSS/JS)** <!-- id: 1 -->
  - [x] Create basic HTML structure for the notification popup `PopUp_Preview.html` <!-- id: 2 -->
  - [x] Implement core CSS styles (Glassmorphism, variables for customization) in `Styles/style.scss` <!-- id: 3 -->
  - [x] Implement Animation Logic (Add/Remove 'active' class) in `animation.js` <!-- id: 4 -->
  - [x] Implement Data Logic (Random Viewers, Random Purchasers) with fake data in `ScriptGeneretor.js` <!-- id: 5 -->

- [x] **Phase 2: UI Builder (Configuration Interface)** <!-- id: 6 -->
  - [x] Create UI Builder layout (Sidebar, Preview Area) in `index.html` <!-- id: 7 -->
  - [x] Implement Controls for Visuals (Colors, Border, Stroke) <!-- id: 8 -->
  - [x] Implement Controls for Behavior (Speed, Delay, Counts) <!-- id: 9 -->
  - [x] Implement Data Input (Custom Names/Locations) <!-- id: 10 -->
  - [x] Real-time Preview Binding (Update popup when controls change) <!-- id: 11 -->

- [x] **Phase 3: Export & Packaging** <!-- id: 12 -->
  - [x] Develop "Get Code" functionality <!-- id: 13 -->
  - [x] Generate optimized Export Script (CSS Import + Config Script + Logic Script) <!-- id: 14 -->
  - [x] Verify the exported code works on a clean HTML page <!-- id: 15 -->

- [x] **Phase 4: Refinement & Polish** <!-- id: 16 -->
  - [x] Add multiple animation presets (Fade, Slide, Zoom) <!-- id: 17 -->
  - [x] Polish UI Builder aesthetics <!-- id: 18 -->

- [-] **Phase 5: UI Refinement & Versioning** <!-- id: 19 -->
  - [x] Implement Versioning in CDN URLs (`v1.0` structure) <!-- id: 20 -->
  - [x] Rebuild Builder UI with Tailwind CSS (Shadcn/Radix style) <!-- id: 21 -->
  - [ ] Redesign PopUp UI based on user's image (Request details) <!-- id: 22 -->

- [-] **Phase 6: Logic Simplification & Preview Controls** <!-- id: 23 -->
  - [x] Add Play/Pause Toggle for Animation Preview <!-- id: 24 -->
  - [x] Simplify Purchase Notif (Remove Product/Location, Generic "Just bought") <!-- id: 25 -->
  - [x] Remove Avatar from "Viewer Count" logic <!-- id: 26 -->
  - [x] Add Avatar Config (Use Avatar Checkbox, Male/Female URL Inputs) <!-- id: 27 -->

- [x] **Phase 7: Advanced Preview UI** <!-- id: 28 -->
  - [x] Implement "Static Preview Mode" (Show both Viewer & Purchase popups centered when Paused) <!-- id: 29 -->
  - [x] Update Animation Preview to be relative to Builder Canvas (not Viewport) <!-- id: 30 -->
  - [x] Update Real-time bindings to affect static preview elements <!-- id: 31 -->

- [x] **Phase 8: Polish & Fixes** <!-- id: 32 -->
  - [x] Add Padding Slider (Index.html + Logic + CSS) <!-- id: 33 -->
  - [x] Fix Animation Opacity bug (Clear inline style on Play) <!-- id: 34 -->

- [x] **Phase 9: Advanced Styling & Layout** <!-- id: 35 -->
  - [x] Refactor Padding to 4 inputs (Top/Right/Bot/Left) + Constrain Toggle <!-- id: 36 -->
  - [x] Add Drop Shadow Controls (Toggle, X, Y, Blur, Color+Alpha) <!-- id: 37 -->
  - [x] Remove Close Button from UI and Code <!-- id: 38 -->

- [x] **Phase 10: Logic Refinement (Avatar & Gender)** <!-- id: 39 -->
  - [x] UI: Add "Custom Female Names" input (visible when Avatar checked) <!-- id: 40 -->
  - [x] Logic: Update export to include `gender` field in names list <!-- id: 41 -->
  - [x] Generator: Update default names to full names with gender <!-- id: 42 -->
  - [x] Generator: Match Avatar to Name's Gender <!-- id: 43 -->
