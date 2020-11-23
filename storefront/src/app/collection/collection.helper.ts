/**
 * Get collectionName from localstorage if exists, or remove if collection is null/undefined
 */
export function getCollectionFromStorage(): string {
  return window.localStorage.getItem('collectionName');
}

export function setCollectionInStorage(collectionName: string): void {
  if (!collectionName) {
    return window.localStorage.removeItem('collectionName');
  }
  return window.localStorage.setItem('collectionName', collectionName);
}
