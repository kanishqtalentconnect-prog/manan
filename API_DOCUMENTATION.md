# Manan API Documentation

This document is a developer handoff for the Manan real-estate web application. It explains the backend API, request/response contracts, authentication, models, caching, uploads, notifications, and frontend integration points.

## Project Overview

The project has two applications:

- `backend`: Node.js, Express, MongoDB/Mongoose, Redis, Cloudinary, JWT auth.
- `frontend`: React, TypeScript, Vite, Axios, Tailwind CSS.

Backend entry points:

- `backend/src/server.js`: loads env, connects MongoDB, starts Express.
- `backend/src/app.js`: configures CORS, JSON middleware, and mounts all routes.

Frontend API client:

- `frontend/src/api/axios.ts`: creates the Axios client using `VITE_API_BASE_URL`.
- The client automatically adds `Authorization: Bearer <token>` from `localStorage.token`.

## Local Setup

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default backend port:

```text
5000
```

API base URL format:

```text
http://localhost:5000/api
```

## Environment Variables

Backend variables used by the code:

| Variable | Purpose |
| --- | --- |
| `PORT` | Optional backend port. Defaults to `5000`. |
| `MONGO_URI` | MongoDB connection string. |
| `JWT_SECRET` | Signs and verifies JWT tokens. |
| `REDIS_URL` | Redis connection URL. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `ADMIN_EMAIL` | Receives booking/enquiry email notifications. |
| `ADMIN_PHONE` | Intended admin WhatsApp recipient. Some WhatsApp calls are commented. |
| `GAS_EMAIL_URL` | Google Apps Script endpoint for sending email. |
| `GUPSHUP_SOURCE` | Gupshup WhatsApp source number. |
| `GUPSHUP_API_KEY` | Gupshup API key. |

Frontend variables:

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Backend API base URL, usually `http://localhost:5000/api`. |

Do not commit real `.env` values.

## CORS

The backend allows requests from:

- `http://localhost:5173`
- `http://31.97.232.215:4001`
- Vercel deployment URLs listed in `backend/src/app.js`
- `https://nirvayadevbhoomi.in`

Requests without an `Origin` header are allowed, which helps tools like Postman or server-to-server requests.

## Authentication

Admin-only routes use both middleware:

```text
protect -> adminOnly
```

Client header:

```http
Authorization: Bearer <jwt>
```

JWT payload:

```json
{
  "_id": "userId",
  "role": "admin"
}
```

Token expiry:

```text
1 day
```

Auth errors:

| Status | Meaning |
| --- | --- |
| `401` | Missing token, invalid token, or user not found. |
| `403` | Valid user, but not an admin. |

## Response Style

The codebase currently uses plain JSON responses rather than one shared response wrapper. Common success shapes:

```json
{ "message": "Action completed", "data": {} }
```

or direct documents/arrays:

```json
[{ "_id": "...", "title": "..." }]
```

Common error shape:

```json
{ "message": "Error message" }
```

## Uploads

Property and content uploads use `backend/src/middlewares/upload.middleware.js`:

- Storage: Cloudinary through `multer-storage-cloudinary`.
- Form field name: `media`.
- Max file size: 50 MB.
- Max files:
  - Properties: 10 files.
  - Content: 5 files.
- Images allowed: `jpg`, `jpeg`, `png`, `webp`.
- Videos allowed: `mp4`, `mov`, `webm`.

Review uploads use memory storage in `backend/src/routes/review.routes.js`:

- Form field name: `image`.
- Max file size: 2 MB.
- Images only.
- Uploaded manually to Cloudinary folder `manan/reviews`.

## Cache Keys

Redis is used in two ways:

- `backend/src/config/redis.js`: `ioredis`.
- `backend/src/utils/redis.js`: `redis` package client.

Current cache keys:

| Key | Used For | TTL | Invalidated By |
| --- | --- | --- | --- |
| `properties:all` | All property list | 300 sec | Create/update/delete property |
| `property:<id>` | Single property | 300 sec | Update/delete property |
| `content:<section>` | Section media content | 300 sec | Upsert content section |
| `reviews:verified` | Public verified reviews | 3600 sec | Admin create/verify/delete review |
| `site_stats` | Public site stats | 3600 sec | Update stats |
| `admin:stats` | Admin dashboard totals | 60 sec | Create/delete category, create/update/delete property |

Note: booking and enquiry creation currently do not clear `admin:stats`, so admin dashboard totals for those counts may remain cached for up to 60 seconds.

## Data Models

### User

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String, unique",
  "password": "String, bcrypt hashed before save",
  "role": "admin | user"
}
```

### Category

```json
{
  "_id": "ObjectId",
  "name": "String, unique, required",
  "slug": "String, unique, lowercase, required",
  "isActive": "Boolean, default true",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Property

```json
{
  "_id": "ObjectId",
  "title": "String, required",
  "description": "String",
  "location": "String",
  "price": "Number",
  "area": "Number",
  "bedrooms": "Number",
  "bathrooms": "Number",
  "dimensions": "String",
  "category": "ObjectId -> Category, required",
  "tag": "String",
  "numberProperty": "Number",
  "media": [
    {
      "url": "String",
      "type": "image | video"
    }
  ],
  "googleMapUrl": "String",
  "googleLocationUrl": "String",
  "status": "available | sold | under_construction",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Booking

```json
{
  "_id": "ObjectId",
  "property": "ObjectId -> Property",
  "name": "String",
  "email": "String",
  "phone": "String",
  "visitDate": "Date",
  "timeSlot": "String, required",
  "comingFrom": "String, required",
  "status": "pending | confirmed | cancelled",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Enquiry

```json
{
  "_id": "ObjectId",
  "property": "ObjectId -> Property, required",
  "propertyTitle": "String, required",
  "name": "String, required",
  "email": "String, required",
  "phone": "String, required",
  "bestTimeToReach": "String, required",
  "question": "String, required",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Content

```json
{
  "_id": "ObjectId",
  "section": "hero | about | hero2 | hero3",
  "media": [
    {
      "url": "String",
      "type": "image | video"
    }
  ],
  "isActive": "Boolean, default true",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Review

```json
{
  "_id": "ObjectId",
  "name": "String, required",
  "email": "String, required, valid email",
  "description": "String, required, max 1000 chars",
  "propertyBought": "String",
  "rating": "Integer 1-5, required",
  "image": "String | null",
  "address": "String",
  "isVerified": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### SiteStats

```json
{
  "_id": "ObjectId",
  "transactionValue": "String, default '0'",
  "happyCustomers": "Number, default 0",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## API Reference

All endpoints below are mounted under:

```text
/api
```

For example:

```text
POST /api/auth/login
```

### Auth APIs

Base route:

```text
/api/auth
```

#### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

Auth:

```text
Public
```

Request body:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

Notes:

- `role` can be `admin` or `user`.
- Password is hashed before saving.
- If email already exists, returns `400`.

Success response:

```json
{
  "token": "jwt",
  "user": {
    "id": "userId",
    "name": "Admin User",
    "role": "admin"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Auth:

```text
Public
```

Request body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "token": "jwt",
  "user": {
    "id": "userId",
    "name": "Admin User",
    "role": "admin"
  }
}
```

Error responses:

```json
{ "message": "Invalid credentials" }
```

### Property APIs

Base route:

```text
/api/properties
```

#### Create Property

```http
POST /api/properties
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Form fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes | Property name/title. |
| `description` | string | No | Full description. |
| `price` | number/string | No | Mongoose casts numeric strings. |
| `category` | ObjectId string | Yes | Existing category ID. |
| `tag` | string | No | Example: `Limited availability`. |
| `numberProperty` | number/string | No | Display count/number. |
| `bedrooms` | number/string | Conditional | Used for non-land properties. |
| `bathrooms` | number/string | Conditional | Used for non-land properties. |
| `area` | number/string | Conditional | Area in sq ft. |
| `dimensions` | string | Conditional | Used for land. |
| `googleMapUrl` | string | No | Embed iframe source URL. |
| `googleLocationUrl` | string | No | Shareable Google Maps URL. |
| `media` | file[] | No | Up to 10 image/video files. |

Success response:

```json
{
  "_id": "propertyId",
  "title": "Luxury 3 BHK Villa",
  "category": "categoryId",
  "media": [
    {
      "url": "https://cloudinary.com/...",
      "type": "image"
    }
  ]
}
```

Side effects:

- Uploads media to Cloudinary.
- Clears `properties:all`.
- Clears `admin:stats`.

#### Get All Properties

```http
GET /api/properties
```

Auth:

```text
Public
```

Success response:

```json
[
  {
    "_id": "propertyId",
    "title": "Luxury 3 BHK Villa",
    "category": {
      "_id": "categoryId",
      "name": "Villa",
      "slug": "villa"
    },
    "media": []
  }
]
```

Behavior:

- Populates `category`.
- Sorts newest first.
- Reads/writes Redis key `properties:all`.

#### Get Property By ID

```http
GET /api/properties/:id
```

Auth:

```text
Public
```

Path params:

| Param | Type | Description |
| --- | --- | --- |
| `id` | ObjectId | Property ID. |

Success response:

```json
{
  "_id": "propertyId",
  "title": "Luxury 3 BHK Villa",
  "category": {
    "_id": "categoryId",
    "name": "Villa",
    "slug": "villa"
  }
}
```

Error response:

```json
{ "message": "Property not found" }
```

Behavior:

- Populates `category`.
- Reads/writes Redis key `property:<id>`.

#### Update Property

```http
PUT /api/properties/:id
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Path params:

| Param | Type | Description |
| --- | --- | --- |
| `id` | ObjectId | Property ID. |

Form fields:

Same as create property, plus:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `removedMedia` | JSON string array | No | Existing media URLs to remove from the property document. |

Example:

```json
["https://res.cloudinary.com/.../image.jpg"]
```

Success response:

```json
{
  "_id": "propertyId",
  "title": "Updated title",
  "media": []
}
```

Side effects:

- Adds new uploaded media.
- Removes `removedMedia` URLs from the stored media array.
- Clears `properties:all`, `property:<id>`, and `admin:stats`.

Note:

- The update removes media references from MongoDB. It does not currently destroy removed property/content assets from Cloudinary.

#### Delete Property

```http
DELETE /api/properties/:id
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
{ "message": "Property deleted successfully" }
```

Side effects:

- Deletes the property document.
- Clears `properties:all`, `property:<id>`, and `admin:stats`.

### Category APIs

Base route:

```text
/api/categories
```

#### Create Category

```http
POST /api/categories
Content-Type: application/json
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Request body:

```json
{
  "name": "Villa"
}
```

Success response:

```json
{
  "_id": "categoryId",
  "name": "Villa",
  "slug": "villa",
  "isActive": true
}
```

Side effects:

- Generates slug using `slugify`.
- Clears `admin:stats`.

#### Get All Categories

```http
GET /api/categories
```

Auth:

```text
Public
```

Success response:

```json
[
  {
    "_id": "categoryId",
    "name": "Villa",
    "slug": "villa",
    "isActive": true
  }
]
```

Behavior:

- Returns only `isActive: true` categories.
- Sorts by `name`.

#### Get Category By ID

```http
GET /api/categories/:id
```

Auth:

```text
Public
```

Success response:

```json
{
  "_id": "categoryId",
  "name": "Villa",
  "slug": "villa",
  "isActive": true
}
```

Note:

- The route calls `.populate("category", "name")`, but the Category model does not define a `category` field. This populate call has no practical effect.

#### Delete Category

```http
DELETE /api/categories/:id
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Behavior:

- Checks if any property references the category.
- Blocks deletion if in use.

Success response:

```json
{ "message": "Category deleted successfully" }
```

Possible error:

```json
{
  "message": "Cannot delete category. It is used by existing properties."
}
```

Side effects:

- Clears `admin:stats`.

### Booking APIs

Base route:

```text
/api/bookings
```

#### Create Booking / Site Visit

```http
POST /api/bookings
Content-Type: application/json
```

Auth:

```text
Public
```

Request body:

```json
{
  "propertyId": "propertyId",
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "9999999999",
  "visitDate": "2026-06-25",
  "timeSlot": "11:00 AM - 12:00 PM",
  "comingFrom": "Dehradun"
}
```

Required fields:

- `propertyId`
- `name`
- `email`
- `phone`
- `visitDate`
- `timeSlot`
- `comingFrom`

Success response:

```json
{
  "message": "Site visit booked successfully",
  "booking": {
    "_id": "bookingId",
    "property": "propertyId",
    "status": "pending"
  }
}
```

Side effects:

- Sends customer email using `GAS_EMAIL_URL`.
- Sends admin email to `ADMIN_EMAIL`.
- WhatsApp notification code exists but is currently commented in this controller.

#### Get All Bookings

```http
GET /api/bookings
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
[
  {
    "_id": "bookingId",
    "property": {
      "_id": "propertyId",
      "title": "Luxury 3 BHK Villa",
      "propertyType": null
    },
    "name": "Customer Name",
    "status": "pending"
  }
]
```

Behavior:

- Populates property with `title propertyType`.
- Sorts newest first.

Note:

- `propertyType` is not present in the current Property schema, so it may be absent/null in responses.

#### Update Booking Status

```http
PATCH /api/bookings/:id/status
Content-Type: application/json
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Request body:

```json
{
  "status": "confirmed"
}
```

Allowed status values:

- `confirmed`
- `cancelled`

Success response:

```json
{
  "message": "Booking status updated",
  "booking": {
    "_id": "bookingId",
    "status": "confirmed"
  }
}
```

Side effects:

- Sends customer email about confirmation/cancellation.
- WhatsApp notification code exists but is currently commented in this controller.

### Enquiry APIs

Base route:

```text
/api/enquiries
```

#### Create Enquiry

```http
POST /api/enquiries
Content-Type: application/json
```

Auth:

```text
Public
```

Request body:

```json
{
  "propertyId": "propertyId",
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "9999999999",
  "bestTimeToReach": "Evening",
  "question": "Is this property still available?"
}
```

Required fields:

- `propertyId`
- `name`
- `email`
- `phone`
- `bestTimeToReach`
- `question`

Success response:

```json
{
  "message": "Enquiry submitted successfully",
  "enquiry": {
    "_id": "enquiryId",
    "property": "propertyId",
    "propertyTitle": "Luxury 3 BHK Villa"
  }
}
```

Side effects:

- Validates the property exists.
- Sends customer email.
- Sends admin email to `ADMIN_EMAIL`.
- WhatsApp notification code exists but is currently commented in this controller.

#### Get All Enquiries

```http
GET /api/enquiries
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
[
  {
    "_id": "enquiryId",
    "property": {
      "_id": "propertyId",
      "title": "Luxury 3 BHK Villa"
    },
    "name": "Customer Name",
    "question": "Is this property still available?"
  }
]
```

Behavior:

- Populates property with `title`.
- Sorts newest first.

### Content APIs

Base route:

```text
/api/content
```

#### Upsert Content Section

```http
POST /api/content
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Form fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `section` | string | Yes | Must be one of Content model enum values. |
| `media` | file[] | No | Up to 5 files. |
| `removedMedia` | JSON string array | No | URLs to remove from the stored `media` array. |

Valid `section` values from the Content model:

- `hero`
- `about`
- `hero2`
- `hero3`

Success response:

```json
{
  "_id": "contentId",
  "section": "hero",
  "media": [
    {
      "url": "https://cloudinary.com/...",
      "type": "image"
    }
  ],
  "isActive": true
}
```

Behavior:

- Creates the section document if it does not exist.
- Pulls removed media URLs from `media`.
- Pushes new uploaded media.
- Clears `content:<section>`.

Note:

- Upload middleware recognizes `hero4`, but the Content schema enum currently allows only `hero`, `about`, `hero2`, and `hero3`.

#### Get Content By Section

```http
GET /api/content/:section
```

Auth:

```text
Public
```

Success response:

```json
{
  "_id": "contentId",
  "section": "hero",
  "media": [],
  "isActive": true
}
```

Error response:

```json
{ "message": "Content not found" }
```

Behavior:

- Returns only active content.
- Reads/writes Redis key `content:<section>`.

Frontend usage:

| Section | Frontend component/page |
| --- | --- |
| `hero` | `Hero.tsx` |
| `about` | `NataDol.tsx` |
| `hero2` | `About.tsx` |
| `hero3` | `Hero3.tsx` |

### Review APIs

Base route:

```text
/api/reviews
```

#### Get Verified Reviews

```http
GET /api/reviews
```

Auth:

```text
Public
```

Success response:

```json
[
  {
    "_id": "reviewId",
    "name": "Customer Name",
    "description": "Great experience",
    "rating": 5,
    "isVerified": true
  }
]
```

Behavior:

- Returns only `isVerified: true`.
- Sorts newest first.
- Reads/writes Redis key `reviews:verified`.

#### Create Public Review

```http
POST /api/reviews/public
Content-Type: multipart/form-data
```

Auth:

```text
Public
```

Form fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | Yes | Reviewer name. |
| `email` | string | Yes | Reviewer email. |
| `description` | string | Yes | Max 1000 chars by schema. |
| `rating` | number/string | Yes | Integer from 1 to 5. |
| `propertyBought` | string | No | Property name/details. |
| `address` | string | No | City/location. |
| `image` | file | No | Image only, max 2 MB. |

Success response:

```json
{
  "message": "Review submitted for verification"
}
```

Behavior:

- Creates review with `isVerified: false`.
- If image is sent, uploads to Cloudinary folder `manan/reviews`.

#### Get All Reviews

```http
GET /api/reviews/admin
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
[
  {
    "_id": "reviewId",
    "name": "Customer Name",
    "rating": 5,
    "isVerified": false
  }
]
```

Behavior:

- Returns verified and unverified reviews.
- Sorts newest first.

#### Create Admin Review

```http
POST /api/reviews/admin
Content-Type: multipart/form-data
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Form fields:

Same as public review.

Success response:

```json
{
  "message": "Review added successfully"
}
```

Behavior:

- Creates review with `isVerified: true`.
- Clears `reviews:verified`.

#### Verify Review

```http
PATCH /api/reviews/:id/verify
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
{
  "message": "Review verified successfully"
}
```

Side effects:

- Sets `isVerified: true`.
- Clears `reviews:verified`.

#### Delete Review

```http
DELETE /api/reviews/:id
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
{
  "message": "Review deleted successfully"
}
```

Behavior:

- Deletes the review.
- If `review.image` exists, attempts to delete `manan/reviews/<publicId>` from Cloudinary.
- Clears `reviews:verified`.

### Site Stats APIs

Base route:

```text
/api/stats
```

#### Get Site Stats

```http
GET /api/stats
```

Auth:

```text
Public
```

Success response:

```json
{
  "success": true,
  "data": {
    "_id": "statsId",
    "transactionValue": "0",
    "happyCustomers": 100
  }
}
```

Behavior:

- Reads/writes Redis key `site_stats`.

#### Update Site Stats

```http
PUT /api/stats
Content-Type: application/json
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Request body:

```json
{
  "transactionValue": "50 Cr+",
  "happyCustomers": 250
}
```

Success response:

```json
{
  "success": true,
  "message": "Site statistics updated successfully",
  "data": {
    "_id": "statsId",
    "transactionValue": "50 Cr+",
    "happyCustomers": 250
  }
}
```

Behavior:

- Creates the first stats document if none exists.
- Otherwise updates only provided fields.
- Clears `site_stats`.

### Admin Stats API

Base route:

```text
/api/admin
```

#### Get Admin Dashboard Stats

```http
GET /api/admin/stats
Authorization: Bearer <admin-token>
```

Auth:

```text
Admin only
```

Success response:

```json
{
  "totalProperties": 12,
  "enquiries": 8,
  "siteVisits": 4,
  "categories": 3,
  "reviews": 6
}
```

Behavior:

- Counts:
  - `Property.countDocuments()`
  - `Booking.countDocuments()`
  - `Enquiry.countDocuments()`
  - `Category.countDocuments()`
  - verified reviews only
- Reads/writes Redis key `admin:stats` with 60-second TTL.

## Frontend API Usage Map

| Frontend area | API calls |
| --- | --- |
| Login | `POST /auth/login` |
| Home property listing | `GET /properties` |
| Property details | `GET /properties/:id` |
| Admin dashboard | `GET /properties`, `GET /admin/stats` |
| Admin properties | `GET /properties`, `DELETE /properties/:id` |
| Add/edit property | `GET /categories`, `POST /properties`, `PUT /properties/:id` |
| Book site visit modal | `POST /bookings` |
| Admin bookings | `GET /bookings`, `PATCH /bookings/:id/status` |
| Enquiry modal | `POST /enquiries` |
| Admin enquiries | `GET /enquiries` |
| Content management | `GET /content/:section`, `POST /content`, `GET /stats`, `PUT /stats` |
| Homepage hero/content sections | `GET /content/hero`, `GET /content/about`, `GET /content/hero2`, `GET /content/hero3` |
| Reviews/testimonials | `GET /reviews`, `POST /reviews/public`, `POST /reviews/admin`, `GET /reviews/admin`, `PATCH /reviews/:id/verify`, `DELETE /reviews/:id` |

## Admin Workflow Summary

1. Admin logs in with `POST /api/auth/login`.
2. Frontend stores `token` in local storage.
3. Axios attaches the token to future requests.
4. Admin can:
   - Manage properties.
   - Manage categories.
   - Manage content media.
   - Manage bookings.
   - View enquiries.
   - Add/verify/delete reviews.
   - Update site stats.

## Public Workflow Summary

Public users can:

- Browse properties.
- View property details.
- Submit property enquiries.
- Book site visits.
- View content media sections.
- View verified reviews.
- Submit reviews for admin verification.
- View public site stats.

## Important Implementation Notes

- There is no centralized validation library. Most validation is manual in controllers or handled by Mongoose schema rules.
- Error responses are not fully standardized across all routes.
- Two Redis clients are used (`ioredis` and `redis`). Future cleanup could standardize on one client.
- Removed property/content media URLs are removed from MongoDB arrays but not deleted from Cloudinary.
- Review image deletion derives a Cloudinary public ID from the image URL. This works only if the URL structure matches the expected folder and filename.
- `Content` schema allows `hero`, `about`, `hero2`, `hero3`; upload middleware also references `hero4`.
- `Booking` populate includes `propertyType`, but current `Property` schema does not define that field.
- `Category` get-by-id route populates `category`, but the Category schema does not define that field.
- `backend/src/middlewares/error.middleware.js` and `backend/src/utils/apiResponse.js` exist but are not currently wired into the main Express app flow.

