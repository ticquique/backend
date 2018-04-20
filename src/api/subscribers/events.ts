/**
 * events
 * ---------------------
 * Define all your possible custom events here.
 */
export const events = {
    user: {
        created: 'onUserCreate',
        registered: 'onUserRegistry',
    },
    chat: {
        created: 'onChatCreated',
    },
    subscription: {
        subscribed: 'onSubscription',
        unsubscribed: 'onUnsubscription',
        deleted: 'onSubscriptionDeleted',
    },
    post: {
        created: 'onPostCreated',
    },
    reaction: {
        created: 'onReaction',
    },
};
