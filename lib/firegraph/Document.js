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
exports.resolveDocument = void 0;
const Collection_1 = require("./Collection");
/**
 * Retrieves a single document from a specified document path. Retrieves
 * all fields indicated in the GraphQL selection set, including any nested
 * collections or references that are defined.
 * @param store An initialized Firestore instance.
 * @param documentPath The path of the document we want to retrieve.
 * @param selectionSet The rules for defining the documents we want to get.
 * @param cacheManager An instance of cache manager to use
 */
function resolveDocument(store, documentPath, selectionSet, cacheManager, fetchedDocument) {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        let doc;
        let docResult = {};
        let cachedDoc = cacheManager.getDocument(documentPath);
        // If cache is found, use it
        if (cachedDoc != undefined) {
            doc = cachedDoc;
            data = doc.data();
        }
        // If this function is passed with a Firestore document (i.e. from the
        // `resolveCollection` API), we don't need to fetch it again.
        else if (fetchedDocument) {
            doc = fetchedDocument;
            data = fetchedDocument.data();
        }
        else {
            doc = yield store.doc(documentPath).get();
            data = doc.data();
            // Add document to cache
            cacheManager.saveDocument(documentPath, doc);
        }
        if (selectionSet && selectionSet.selections) {
            const fieldsToRetrieve = selectionSet.selections;
            for (let field of fieldsToRetrieve) {
                let args = {};
                for (let arg of field.arguments) {
                    args[arg.name.value] = arg.value.value;
                }
                const fieldName = field.name.value;
                const { selectionSet } = field;
                const { alias } = field;
                // Here we handle document references and nested collections.
                // First, we need to determine which one we are dealing with.
                if (selectionSet && selectionSet.selections) {
                    let nestedPath;
                    // If its just raw path of some document
                    if (typeof data[fieldName] == 'string') {
                        const docId = data[fieldName];
                        // If parent path is provided, consider it
                        const { path } = args;
                        let documentParentPath = path ? path : '';
                        nestedPath = `${documentParentPath}${docId}`;
                        const nestedResult = yield resolveDocument(store, nestedPath, selectionSet, cacheManager);
                        if (alias != undefined)
                            docResult[alias.value] = nestedResult;
                        else
                            docResult[fieldName] = nestedResult;
                        // if field is of Document Reference type, use its path to resolve the document
                    }
                    else if (data[fieldName] != undefined &&
                        data[fieldName].constructor.name == 'DocumentReference') {
                        nestedPath = `${data[fieldName].path}`;
                        const nestedResult = yield resolveDocument(store, nestedPath, selectionSet, cacheManager);
                        if (alias != undefined)
                            docResult[alias.value] = nestedResult;
                        else
                            docResult[fieldName] = nestedResult;
                        // Else consider it a nested collection.
                    }
                    else {
                        nestedPath = `${documentPath}/${fieldName}`;
                        const nestedResult = yield Collection_1.resolveCollection(store, nestedPath, args, selectionSet, cacheManager);
                        if (alias != undefined)
                            docResult[alias.value] = nestedResult.docs;
                        else
                            docResult[fieldName] = nestedResult.docs;
                    }
                }
                else {
                    if (fieldName === 'id') {
                        docResult[fieldName] = doc.id;
                    }
                    else {
                        if (alias != undefined)
                            docResult[alias.value] = data[fieldName];
                        else
                            docResult[fieldName] = data[fieldName];
                    }
                }
            }
        }
        return docResult;
    });
}
exports.resolveDocument = resolveDocument;
