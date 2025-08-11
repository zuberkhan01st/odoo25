# QuickCourt — Sports Facility Booking Platform
 This repository implements a full-stack sports facility booking platform with a **Next.js** frontend and a **Node.js + Express** backend, using **MongoDB** for persistence. It includes authentication for users, facility owners, and admins, supports image upload (Cloudinary), payments (Razorpay), email (SendinBlue/Brevo & Nodemailer), geolocation autocomplete (Geoapify), and optional AI-powered recommendations (GROQ/`groq-sdk`).
 ## Table of contents
 - [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick start (local)](#quick-start-local)
- [Environment variables](#environment-variables)
- [API endpoints (summary)](#api-endpoints-summary)
- [Database models (summary)](#database-models-summary)
- [Services](#services)
- [Folder structure](#folder-structure)
- [Available scripts](#available-scripts)
- [Deployment recommendations](#deployment-recommendations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License & Credits](#license--credits)
 ## Features
 
- User registration and authentication (user, owner, admin roles).
- Venue, facility, and court management (owners can add venues, courts, manage availability).
- Booking flow with payment integration (Razorpay) and booking cancellation.
- Reviews & posts: users can create reviews and posts (protected endpoints).
- Image uploads via Cloudinary.
- Email notifications via Brevo/SendinBlue and/or Nodemailer.
- Geolocation autocomplete (Geoapify) for venue/location search.
- AI-powered recommendations using GROQ / groq-sdk (experimental endpoint).
- Admin dashboard endpoints for moderation, reports and stats.
- Next.js frontend provides user dashboard, admin/owner views and booking UI.
 ## Architecture

<img width="1299" height="645" alt="odoo25_architecture" src="https://github.com/user-attachments/assets/0d67070e-0c4a-4779-a605-7fd36b6b07a6" />


 High-level components:
 - **Client:** Next.js app (`/client`) — UI, pages, components, authentication flows.
- **Server:** Node.js + Express (`/server`) — REST API, controllers, models, middleware.
- **Database:** MongoDB (configured in `server/config/db.js`).
- **Third-party services:** Cloudinary (images), Razorpay (payments), Brevo/SendinBlue (emails), Geoapify (geolocation), GROQ (AI recommendations).

 ## Prerequisites
 - Node.js v16+ (v18 recommended)
- npm or pnpm (project includes `pnpm-lock.yaml` in client — pnpm recommended)
- MongoDB (Atlas or local)
- Accounts/keys for Cloudinary, Razorpay, Brevo/SendinBlue, Geoapify, GROQ (optional)

 ## Quick start (local)
 1. Clone the repository and extract the ZIP (already done).
2. Create a `.env` file in the `server/` directory with the environment variables listed below.

 Install and run the backend:
 ```bash
cd server
npm install
# For development (auto-reload)
npm run dev
# For production
npm run start
```
 Install and run the frontend:
 ```bash
cd client
npm install
npm run dev
# Production build
npm run build
npm run start
```

 ## Environment variables
 Place the following variables in `server/.env`. These are collected from scanning the server code — required variables are listed first.
 ```env
# Required
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Ports
PORT=5000

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Payments (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email (Nodemailer or SendinBlue/Brevo)
EMAIL_SERVICE=gmail  # or 'smtp' depending on provider
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
BREVO_API_KEY=your_brevo_api_key
BREVO_EMAIL_USER=your_sender_email

# Geo & AI services
GEOAPIFY_KEY=your_geoapify_key
GROQ_API_KEY=your_groq_api_key  # optional - for groq-sdk
GROQ=your_groq_api_key_alt

# CORS
CORS_ORIGIN=http://localhost:3000
```
 Notes:
- `MONGO_URI` is required and the server will exit if it is not provided.
- `JWT_SECRET` is required for token signing and authentication middlewares.
- `CORS_ORIGIN` controls allowed frontend origin(s).

 ## API endpoints (summary)
 Below is a concise listing of the routes discovered under `server/routes/*`. For full details see the route/controller files.
 ### `adminRoutes`
 - **POST** `/signup`
 - **POST** `/login`
 - **GET** `/dashboard`
 - **GET** `/facilities/pending`
 - **GET** `/facilities/:id`
 - **POST** `/facilities/:id/approve`
 - **POST** `/facilities/:id/reject`
 - **GET** `/users`
 - **POST** `/users/:id/ban`
 - **POST** `/users/:id/unban`
 - **GET** `/users/:id/bookings`
 - **GET** `/reports`
 - **POST** `/reports/:id/action`
 - **GET** `/profile`
 - **PUT** `/profile`
 
 ### `aiRoutes`
 - **POST** `/ai/recommend`
 
 ### `authRoutes`
 - **POST** `/admin/signup`
 - **POST** `/admin/login`
 - **POST** `/owner/signup`
 - **POST** `/owner/login`
 
 ### `bookingRoutes`
 - **POST** `/`
 - **GET** `/my`
 - **PATCH** `/:id/cancel`
 - **POST** `/create_payment`
 
 ### `courtRoutes`
 - **GET** `/venue/:venueId`
 - **GET** `/:id`
 
 ### `ownerRoutes`
 - **POST** `/signup`
 - **POST** `/login`
 - **GET** `/dashboard`
 - **POST** `/venue`
 - **POST** `/facility`
 - **PUT** `/facility/:id`
 - **POST** `/court`
 - **POST** `/courts`
 - **PUT** `/court/:id`
 - **DELETE** `/court/:id`
 - **POST** `/court/availability`
 - **POST** `/court/block`
 - **GET** `/bookings`
 - **GET** `/profile`
 - **PUT** `/profile`
 
 ### `postRoutes`
 - **GET** `/`
 - **POST** `/`
 
 ### `reviewRoutes`
 - **POST** `/`
 - **GET** `/venue/:venueId`
 
 ### `userRoutes`
 - **GET** `/profile`
 - **PUT** `/profile`
 - **GET** `/insights`
 - **GET** `/facilities`
 - **GET** `/facilities/:id`
 - **GET** `/facilities/:venueId/courts`
 - **GET** `/courts`
 - **GET** `/courts/category`
 - **GET** `/courts/search`
 - **GET** `/courts/venue/:venueId`
 - **GET** `/bookings`
 - **GET** `/bookings/:id`
 
 ### `venueRoutes`
 - **GET** `/`
 - **GET** `/:id`
 
 ## Database models (summary)
 Key Mongoose models found under `server/models/` with top-level fields (not exhaustive):
 ### `Admin`
 - **Fields (sample):** name, type, required, minlength, trim, email, unique, lowercase, match, index, password, select, phone, avatar, venues, ref, totalBookings, default, lastActiveAt
 
 ### `Booking`
 ```js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g., '10:00-11:00'
  price: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentMethod: { type: String }, // e.g., 'card', 'upi', 'cash'
```
 
 ### `Court`
 ```js
import mongoose from 'mongoose';

const courtSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  name: { type: String, required: true },
  sportType: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  operatingHours: {
    start: { type: String, required: true }, // e.g., '08:00'
    end: { type: String, required: true }    // e.g., '22:00'
  },
  amenities: [{ type: String }],
```
 
 ### `Owner`
 - **Fields (sample):** name, type, required, minlength, trim, email, unique, lowercase, match, index, password, select, phone, avatar, venues, ref, totalBookings, default, lastActiveAt
 
 ### `Post`
 - **Fields (sample):** title, content, createdBy
 
 ### `Review`
 ```js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
```
 
 ### `User`
 - **Fields (sample):** favorites, venues, courts
 
 ### `Venue`
 ```js
import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    city: { type: String, trim: true },
    area: { type: String, trim: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
```
 
 ## Services (integration points)
 - **Cloudinary:** `server/services/cloudinaryService.js` — upload & delete images.
- **Razorpay:** `server/services/razorpay.js` — create payment orders, capture payments.
- **Emails:** `server/services/sendBrevoEmail.js`, `server/services/sendEmailService.js`, `server/services/emailService.js` — Brevo/SendinBlue & Nodemailer utilities.
- **Geo Autocomplete:** `server/services/geoLocationService.js` — uses Geoapify.
- **GROQ / AI:** `server/services/groqService.js` — optional AI recommendation integration.
- **Recommendation & meeting services:** `recommendationService.js`, `meetingService.js` — helper utilities.

 ## Folder structure (key folders)
 

/client                # Next.js frontend (pages, components, styles)
/server                # Express backend
  /config              # DB config and environment helpers
  /controllers         # Controller logic for routes
  /models              # Mongoose models
  /routes              # Express routes (api endpoints)
  /services            # 3rd-party integrations (Cloudinary, payments, email, geolocation, AI)
  server.js            # Express app entrypoint
README.md              # (this file is generated)

## Available scripts
 **Server** (see `server/package.json`):
 - `start`: `node server.js` - `dev`: `nodemon server.js` 

**Client** (see `client/package.json`):
 - `build`: `next build` - `dev`: `next dev` - `lint`: `next lint` - `start`: `next start` 
 ## Deployment recommendations
 - Use **MongoDB Atlas** for production; set `MONGO_URI` accordingly.
- Deploy frontend to **Vercel** (Next.js) or Netlify — build and static optimizations available.
- Deploy backend to Render / Railway / Heroku / DigitalOcean App Platform. Use process manager (PM2) or Docker for reliability.
- Store secret keys in environment variables / secret manager. Do NOT commit `.env` to version control.
- Use HTTPS and set proper CORS origin for production.

 ## Troubleshooting & common issues
 - **Server exits at startup:** ensure `MONGO_URI` is set and reachable.
- **Authentication errors:** ensure `JWT_SECRET` matches tokens issued by frontend.
- **CORS failures:** set `CORS_ORIGIN` to your frontend production origin.
- **Cloudinary / Razorpay / Brevo failures:** verify keys and account access; check service logs.

 ## Testing
 - There are no automated tests included in the repository. For manual testing:
  - Use Postman / Insomnia to exercise endpoints under `/api/*`.
  - Use the frontend UI to simulate user flows: sign up, create booking, upload images, pay via Razorpay.

 ## Contributing
 Contributions are welcome. Suggested workflow:
 1. Fork the repo and create a feature branch.
2. Run tests (if added) and linting.
3. Open a pull request with a clear description of changes.

 ## License & credits
 - This generated README does not infer a specific license. Check repository owner for licensing. Add a LICENSE file if needed.
- Credits: project structure and code were analyzed automatically to generate this README.

