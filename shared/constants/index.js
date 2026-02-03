/**
 * Shared Constants
 * Constants used across frontend and backend
 */

module.exports = {
    // User roles
    ROLES: {
        ADMIN: 'admin',
        TRAINER: 'trainer',
        MEMBER: 'member',
    },

    // User statuses
    USER_STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        SUSPENDED: 'suspended',
    },

    // Member tiers
    MEMBER_TIERS: {
        BASIC: 'basic',
        PREMIUM: 'premium',
        VIP: 'vip',
    },

    // Check-in statuses
    CHECK_IN_STATUS: {
        ACTIVE: 'active',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
    },

    // Event types
    EVENT_TYPES: {
        OPERATIONAL_HOURS: 'operational_hours',
        HOLIDAY: 'holiday',
        SPECIAL_EVENT: 'special_event',
        MAINTENANCE: 'maintenance',
    },

    // Notification channels
    NOTIFICATION_CHANNELS: {
        PUSH: 'push',
        SMS: 'sms',
        EMAIL: 'email',
    },

    // Notification statuses
    NOTIFICATION_STATUS: {
        PENDING: 'pending',
        SENT: 'sent',
        FAILED: 'failed',
        DELIVERED: 'delivered',
    },

    // Badge types
    BADGE_TYPES: {
        ACHIEVEMENT: 'achievement',
        STREAK: 'streak',
        MILESTONE: 'milestone',
        SPECIAL: 'special',
    },

    // Equipment statuses
    EQUIPMENT_STATUS: {
        OPERATIONAL: 'operational',
        MAINTENANCE: 'maintenance',
        OUT_OF_ORDER: 'out_of_order',
    },

    // API response statuses
    API_STATUS: {
        SUCCESS: 'success',
        FAIL: 'fail',
        ERROR: 'error',
    },

    // Pagination defaults
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 20,
        MAX_LIMIT: 100,
    },
};
