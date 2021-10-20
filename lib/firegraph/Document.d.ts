import firebase from 'firebase/app';
import { GraphQLSelectionSet } from '../types/GraphQL';
import { FiregraphResult } from '../types/Firegraph';
import { CacheManager } from './CacheManager';
/**
 * Retrieves a single document from a specified document path. Retrieves
 * all fields indicated in the GraphQL selection set, including any nested
 * collections or references that are defined.
 * @param store An initialized Firestore instance.
 * @param documentPath The path of the document we want to retrieve.
 * @param selectionSet The rules for defining the documents we want to get.
 * @param cacheManager An instance of cache manager to use
 */
export declare function resolveDocument(store: firebase.firestore.Firestore, documentPath: string, selectionSet: GraphQLSelectionSet, cacheManager: CacheManager, fetchedDocument?: firebase.firestore.DocumentSnapshot): Promise<FiregraphResult>;
