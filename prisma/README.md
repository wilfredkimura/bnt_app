# Prisma Database Documentation

## Overview

This directory contains the Prisma schema and database configuration for the Books & Trunks Society application. The database uses PostgreSQL and is managed with Prisma ORM v7.

## Database Schema

### Models

#### Story
Stores community stories and testimonials from beneficiaries and volunteers.

**Fields:**
- `id` - Unique identifier (CUID)
- `title` - Story title
- `content` - Full story content (Text)
- `author` - Author name
- `location` - Optional location
- `imageUrl` - Optional image URL
- `published` - Publication status (default: false)
- `featured` - Featured status (default: false)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### ImpactMetric
Tracks impact statistics for the organization.

**Fields:**
- `id` - Unique identifier (CUID)
- `metricType` - Type of metric (e.g., "books_distributed", "children_reached")
- `value` - Numeric value
- `label` - Display label
- `description` - Optional description
- `icon` - Optional icon identifier
- `displayOrder` - Display order (default: 0)
- `isActive` - Active status (default: true)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### GalleryItem
Photo gallery items with optional event association.

**Fields:**
- `id` - Unique identifier (CUID)
- `imageUrl` - Image URL
- `caption` - Optional caption
- `location` - Optional location
- `eventDate` - Optional event date
- `tags` - Array of tags for filtering
- `featured` - Featured status (default: false)
- `displayOrder` - Display order (default: 0)
- `eventId` - Optional foreign key to Event
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Relations:**
- `event` - Optional relation to Event model

#### CommunityMember
Volunteers, team members, and supporters.

**Fields:**
- `id` - Unique identifier (CUID)
- `name` - Member name
- `role` - Role (e.g., "Volunteer", "Team Member")
- `bio` - Optional biography
- `photoUrl` - Optional photo URL
- `email` - Optional email
- `phone` - Optional phone
- `location` - Optional location
- `joinedDate` - Join date (default: now)
- `isActive` - Active status (default: true)
- `featured` - Featured status (default: false)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### Event
Community events and activities.

**Fields:**
- `id` - Unique identifier (CUID)
- `title` - Event title
- `description` - Event description (Text)
- `location` - Event location
- `eventDate` - Event date/time
- `endDate` - Optional end date/time
- `imageUrl` - Optional image URL
- `eventType` - Type of event (e.g., "Book Distribution")
- `attendees` - Number of attendees (default: 0)
- `booksDistributed` - Books distributed at event (default: 0)
- `published` - Publication status (default: false)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Relations:**
- `galleryItems` - One-to-many relation to GalleryItem

## Database Setup

### Prerequisites
- PostgreSQL installed and running locally
- Database created (default name: `bnt_db`)

### Initial Setup

1. **Configure Database Connection**
   
   Update the `.env` file with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bnt_db?schema=public"
   ```

2. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

3. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```
   
   This will create all tables in your PostgreSQL database.

### Available Commands

- `npm run prisma:generate` - Generate Prisma Client from schema
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:studio` - Open Prisma Studio (GUI for database)
- `npm run prisma:push` - Push schema changes without migrations
- `npm run prisma:seed` - Seed database with sample data

## Usage Examples

### Importing the Client

```typescript
import { prisma } from '@/lib/prisma';
// or use utility functions
import { getPublishedStories, getActiveImpactMetrics } from '@/lib/db';
```

### Query Examples

```typescript
// Get all published stories
const stories = await prisma.story.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' }
});

// Get featured gallery items with event data
const galleryItems = await prisma.galleryItem.findMany({
  where: { featured: true },
  include: { event: true }
});

// Get upcoming events with gallery items
const events = await prisma.event.findMany({
  where: {
    published: true,
    eventDate: { gte: new Date() }
  },
  include: { galleryItems: true },
  orderBy: { eventDate: 'asc' }
});
```

### Using Utility Functions

```typescript
import {
  getPublishedStories,
  getFeaturedStories,
  getActiveImpactMetrics,
  getFeaturedGalleryItems,
  getUpcomingEvents
} from '@/lib/db';

// These functions provide type-safe, pre-configured queries
const stories = await getPublishedStories();
const metrics = await getActiveImpactMetrics();
const events = await getUpcomingEvents();
```

## Migrations

Migrations are stored in `prisma/migrations/`. Each migration represents a change to the database schema.

To create a new migration after modifying the schema:
```bash
npm run prisma:migrate
```

You'll be prompted to name the migration. Use descriptive names like:
- `add_tags_to_gallery`
- `create_events_table`
- `add_featured_to_stories`

## Prisma Studio

Prisma Studio provides a visual interface to view and edit your data:

```bash
npm run prisma:studio
```

This will open a browser window at `http://localhost:5555` where you can:
- Browse all tables
- Add, edit, and delete records
- Filter and search data
- View relationships

## Best Practices

1. **Always use migrations** in production environments
2. **Use `prisma:push`** only for rapid prototyping
3. **Keep the schema in sync** with your database
4. **Use transactions** for operations that modify multiple records
5. **Leverage indexes** defined in the schema for performance
6. **Use the utility functions** in `src/lib/db/index.ts` for common queries

## Troubleshooting

### Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure the database exists

### Migration Errors
- Reset database: `npx prisma migrate reset` (⚠️ deletes all data)
- Check for schema syntax errors
- Ensure no manual database changes conflict with migrations

### Type Errors
- Regenerate client: `npm run prisma:generate`
- Restart TypeScript server in your editor
