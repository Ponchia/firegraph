/**
 * Applies filters to a Firestore query. Basically chains a series of
 * calls to `firestore.collection#orderBy`.
 * @param collectionQuery The query to be made against some collection.
 * @param order Set of filters formatted as `KEY_COMPARATOR: ASC/DESC` pairs
 */
export declare const setOrders: (collectionQuery: any, orders: any[]) => firebase.default.firestore.Query;
