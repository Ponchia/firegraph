"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrders = void 0;
/**
 * Applies filters to a Firestore query. Basically chains a series of
 * calls to `firestore.collection#orderBy`.
 * @param collectionQuery The query to be made against some collection.
 * @param order Set of filters formatted as `KEY_COMPARATOR: ASC/DESC` pairs
 */
exports.setOrders = (collectionQuery, orders) => {
    orders.forEach((filter) => {
        const field = filter['key'];
        const order = filter['value'];
        collectionQuery = collectionQuery.orderBy(field, order);
    });
    return collectionQuery;
};
