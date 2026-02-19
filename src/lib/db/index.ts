import { prisma } from '../prisma';
import type {
    Story,
    ImpactMetric,
    GalleryItem,
    CommunityMember,
    Event,
    User,
    Book,
    Trunk,
    Location,
    Report,
    Donation
} from '@prisma/client';

// Export Prisma client
export { prisma };

// Export types for convenience
export type {
    Story,
    ImpactMetric,
    GalleryItem,
    CommunityMember,
    Event,
    User,
    Book,
    Trunk,
    Location,
    Report,
    Donation
};

/**
 * Database utility functions
 */

// ==================
// WEBSITE CONTENT
// ==================

// Stories
export const getPublishedStories = async () => {
    return prisma.story.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
    });
};

export const getFeaturedStories = async () => {
    return prisma.story.findMany({
        where: { published: true, featured: true },
        orderBy: { createdAt: 'desc' },
    });
};

// Impact Metrics
export const getActiveImpactMetrics = async () => {
    return prisma.impactMetric.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
    });
};

// Gallery Items
export const getFeaturedGalleryItems = async () => {
    return prisma.galleryItem.findMany({
        where: { featured: true },
        orderBy: { displayOrder: 'asc' },
        include: { event: true },
    });
};

export const getGalleryItemsByTag = async (tag: string) => {
    return prisma.galleryItem.findMany({
        where: {
            tags: {
                has: tag,
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

// Community Members
export const getActiveCommunityMembers = async () => {
    return prisma.communityMember.findMany({
        where: { isActive: true },
        orderBy: { joinedDate: 'desc' },
    });
};

export const getFeaturedCommunityMembers = async () => {
    return prisma.communityMember.findMany({
        where: { isActive: true, featured: true },
        orderBy: { joinedDate: 'desc' },
    });
};

// Events
export const getUpcomingEvents = async () => {
    return prisma.event.findMany({
        where: {
            published: true,
            eventDate: {
                gte: new Date(),
            },
        },
        orderBy: { eventDate: 'asc' },
        include: { galleryItems: true },
    });
};

export const getPastEvents = async () => {
    return prisma.event.findMany({
        where: {
            published: true,
            eventDate: {
                lt: new Date(),
            },
        },
        orderBy: { eventDate: 'desc' },
        include: { galleryItems: true },
    });
};

// ==================
// OPERATIONAL/ADMIN
// ==================

// Users
export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        include: { donations: true },
    });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        include: { donations: true },
    });
};

// Books
export const getBooksByTrunk = async (trunkId: number) => {
    return prisma.book.findMany({
        where: { trunkId },
        orderBy: { title: 'asc' },
    });
};

export const getKicdApprovedBooks = async () => {
    return prisma.book.findMany({
        where: { isKicdApproved: true },
        orderBy: { title: 'asc' },
    });
};

// Trunks
export const getTrunksByStatus = async (status: 'Planned' | 'InTransit' | 'Delivered') => {
    return prisma.trunk.findMany({
        where: { status },
        include: {
            location: true,
            books: true,
        },
        orderBy: { code: 'asc' },
    });
};

export const getTrunkByCode = async (code: string) => {
    return prisma.trunk.findUnique({
        where: { code },
        include: {
            location: true,
            books: true,
        },
    });
};

// Locations
export const getAllLocations = async () => {
    return prisma.location.findMany({
        include: {
            trunks: true,
        },
        orderBy: { name: 'asc' },
    });
};

export const getLocationById = async (id: number) => {
    return prisma.location.findUnique({
        where: { id },
        include: {
            trunks: {
                include: {
                    books: true,
                },
            },
        },
    });
};

// Reports
export const getReportsByCategory = async (category: 'Financial' | 'Impact' | 'Planning') => {
    return prisma.report.findMany({
        where: { category },
        orderBy: { uploadedAt: 'desc' },
    });
};

export const getRecentReports = async (limit: number = 10) => {
    return prisma.report.findMany({
        orderBy: { uploadedAt: 'desc' },
        take: limit,
    });
};

// Donations
export const getDonationsByUser = async (userId: number) => {
    return prisma.donation.findMany({
        where: { userId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
    });
};

export const getRecentDonations = async (limit: number = 10) => {
    return prisma.donation.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
};

export const getTotalDonations = async () => {
    const result = await prisma.donation.aggregate({
        _sum: {
            amount: true,
        },
    });
    return result._sum.amount || 0;
};
