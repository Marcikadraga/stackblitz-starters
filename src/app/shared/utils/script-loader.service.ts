import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private promises = new Map<string, Promise<void>>();

  load(src: string): Promise<void> {
    const existing = this.promises.get(src);
    if (existing) return existing;

    const p = new Promise<void>((resolve, reject) => {
      // already on page?
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });

    this.promises.set(src, p);
    return p;
  }
}
