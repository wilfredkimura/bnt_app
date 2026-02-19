# Merged Database Schema - Summary

## Overview
Successfully merged the Books & Trunks Society database schema to include both **website content models** and **operational/admin models**.

## Schema Structure

### Enums (6 total)
- `CurriculumType` - CBC, Legacy844, International
- `Role` - Admin, Volunteer, Donor
- `SubscriptionStatus` - Active, Inactive
- `TrunkStatus` - Planned, InTransit, Delivered
- `ReportCategory` - Financial, Impact, Planning
- `Currency` - KES, USD, EUR

### Models (11 total)

#### Website Content Models (5)
1. **Story** - Community stories and testimonials
2. **ImpactMetric** - Impact statistics tracking
3. **GalleryItem** - Photo gallery with event relations
4. **CommunityMember** - Volunteers and team members
5. **Event** - Community events and activities

#### Operational/Admin Models (6)
6. **User** - User accounts with roles and subscriptions
7. **Book** - Book inventory with curriculum tracking
8. **Trunk** - Book trunk management and tracking
9. **Location** - Distribution locations with coordinates
10. **Report** - Financial and impact reports
11. **Donation** - Donation tracking with user relations

## Database Utilities Updated

Added helper functions for all new models in `src/lib/db/index.ts`:

### User Functions
- `getUserByEmail(email)` - Find user with donations
- `getUserById(id)` - Find user with donations

### Book Functions
- `getBooksByTrunk(trunkId)` - Get books in a trunk
- `getKicdApprovedBooks()` - Get approved books

### Trunk Functions
- `getTrunksByStatus(status)` - Filter by status
- `getTrunkByCode(code)` - Find by trunk code

### Location Functions
- `getAllLocations()` - Get all locations with trunks
- `getLocationById(id)` - Get location with trunk details

### Report Functions
- `getReportsByCategory(category)` - Filter by category
- `getRecentReports(limit)` - Get latest reports

### Donation Functions
- `getDonationsByUser(userId)` - User donation history
- `getRecentDonations(limit)` - Latest donations
- `getTotalDonations()` - Total donation amount

## Next Steps

1. **Run migrations** to create database tables:
   ```bash
   npm run prisma:migrate
   ```

2. **Seed data** (optional) - Create sample data for testing

3. **Implement authentication** - Use User model for login/signup

4. **Admin dashboard** - Build admin interface for managing books, trunks, locations

All types are exported and ready to use throughout the application!
