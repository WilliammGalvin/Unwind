// src/electron.d.ts

declare global {
  interface Window {
    electron: {
      setCategoryIndex: (category: string, index: number) => Promise<void>;
      getCategoryIndex: (category: string) => Promise<number | null>;
    };
  }
}

export {};
