"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveCollection = void 0;
const Document_1 = require("./Document");
const Where_1 = require("./Where");
const Order_1 = require("./Order");
/**
 * Retrieves documents from a specified collection path. Currently retrieves
 * all fields indicated in the GraphQL selection set. Eventually this will
 * allow users to conduct queries with GraphQL syntax.
 * @param store An initialized Firestore instance.
 * @param collectionName The path of the collection we want to retrieve.
 * @param selectionSet The rules for defining the documents we want to get.
 * @param cacheManager An instance of cache manager to pass on to the documents fetcher
 */
function resolveCollection(store, collectionName, collectionArgs, selectionSet, cacheManager) {
    return __awaiter(this, void 0, void 0, function* () {
        let collectionQuery = store.collection(collectionName);
        let collectionResult = {
            name: collectionName,
            docs: [],
        };
        if (collectionArgs) {
            if (collectionArgs['where']) {
                const where = collectionArgs['where'];
                collectionQuery = Where_1.setQueryFilters(collectionQuery, where);
            }
            if (collectionArgs['limit']) {
                const limit = Number.parseInt(collectionArgs['limit']);
                collectionQuery = collectionQuery.limit(limit);
            }
            if (collectionArgs['orderBy']) {
                const orders = collectionArgs['orderBy'];
                collectionQuery = Order_1.setOrders(collectionQuery, orders);
            }
        }
        const collectionSnapshot = yield collectionQuery.get();
        if (selectionSet && selectionSet.selections) {
            for (let doc of collectionSnapshot.docs) {
                const documentPath = `${collectionName}/${doc.id}`;
                collectionResult.docs.push(yield Document_1.resolveDocument(store, documentPath, selectionSet, cacheManager));
            }
        }
        return collectionResult;
    });
}
exports.resolveCollection = resolveCollection;
