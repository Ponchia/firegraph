import firebase from 'firebase/app';
import { GraphQLSelectionSet } from '../types/GraphQL';
import { FiregraphCollectionResult } from '../types/Firegraph';
import { CacheManager } from './CacheManager';
/**
 * Retrieves documents from a specified collection path. Currently retrieves
 * all fields indicated in the GraphQL selection set. Eventually this will
 * allow users to conduct queries with GraphQL syntax.
 * @param store An initialized Firestore instance.
 * @param collectionName The path of the collection we want to retrieve.
 * @param selectionSet The rules for defining the documents we want to get.
 * @param cacheManager An instance of cache manager to pass on to the documents fetcher
 */
export declare function resolveCollection(store: firebase.firestore.Firestore, collectionName: string, collectionArgs: {
    [key: string]: any;
}, selectionSet: GraphQLSelectionSet, cacheManager: CacheManager): Promise<FiregraphCollectionResult>;
