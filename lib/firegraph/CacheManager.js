"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
class CacheManager {
    constructor() {
        this.cache = Object.create(null);
    }
    getDocument(path) {
        const doc = this.cache[path];
        // Call listeners
        CacheManager.listeners.forEach((listener) => listener.onCacheRequested(path));
        if (doc == undefined) {
            CacheManager.listeners.forEach((listener) => listener.onCacheMiss(path));
        }
        else {
            CacheManager.listeners.forEach((listener) => listener.onCacheHit(path));
        }
        return doc;
    }
    saveDocument(path, document) {
        this.cache[path] = document;
        CacheManager.listeners.forEach((listener) => listener.onCacheSaved(path));
    }
    static addListener(listener) {
        CacheManager.listeners.push(listener);
    }
    static removeListener(listener) {
        const index = CacheManager.listeners.indexOf(listener);
        CacheManager.listeners.splice(index, 1);
    }
    static removeAllListeners() {
        CacheManager.listeners = [];
    }
}
exports.CacheManager = CacheManager;
CacheManager.listeners = [];
