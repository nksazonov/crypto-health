export function timestampToAge(date: number): number {
  return Math.floor((Date.now() / 1000 - date) / 60 / 60 / 24 / 365);
}

export function timestampToDateString(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function timestampToISODateString(timestamp: number) {
  return new Date(timestamp * 1000).toISOString().slice(0, 16);
}

export function nowToISODateString() {
  return new Date().toISOString().slice(0, 16);
}
