import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private isDark = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    const saved = localStorage.getItem('theme');
    saved === 'dark' ? this.enableDark() : this.enableLight();
  }

  toggleTheme(checked: boolean) {
    checked ? this.enableDark() : this.enableLight();
  }

  private enableDark() {
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }

  private enableLight() {
    this.renderer.addClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }

  get darkMode() {
    return this.isDark;
  }
}
