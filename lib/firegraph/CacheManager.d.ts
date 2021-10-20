export interface CacheManagerListener {
    onCacheHit: (path: string) => void;
    onCacheMiss: (path: string) => void;
    onCacheRequested: (path: string) => void;
    onCacheSaved: (path: string) => void;
}
export declare class CacheManager {
    private cache;
    private static listeners;
    getDocument(path: string): firebase.default.firestore.DocumentSnapshot | undefined;
    saveDocument(path: string, document: firebase.default.firestore.DocumentSnapshot): void;
    static addListener(listener: CacheManagerListener): void;
    static removeListener(listener: CacheManagerListener): void;
    static removeAllListeners(): void;
}
