import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class StyleManager {
    private readonly _document = inject<Document>(DOCUMENT);

    readonly $themeMode: WritableSignal<ThemeMode> = signal<ThemeMode>('dark');
    readonly themeMode$ = toObservable(this.$themeMode);
    readonly $themeModeIcon = computed(() => (this.$themeMode() === 'dark' ? 'light_mode' : 'dark_mode'));
    readonly $themeModeTooltipMessage = computed(() =>
        this.$themeMode() === 'dark' ? 'Turn on the lights' : 'Turn off the lights'
    );

    constructor() {
        const themeMode = this._document.documentElement.getAttribute('data-theme');
        if (themeMode) this.$themeMode.set(themeMode as ThemeMode);
    }

    toggleThemeMode(): void {
        const next = this.$themeMode() === 'dark' ? 'light' : 'dark';
        this.$themeMode.set(next);
        this._document.documentElement.setAttribute('data-theme', next);
    }
}

type ThemeMode = 'dark' | 'light';
