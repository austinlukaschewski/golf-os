import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'ui-icon',
    imports: [CommonModule],
    template: `<span [ngClass]="[iconClass(), sizeClass()]">{{ name() }}</span>`,
    styleUrl: './icon.scss',
})
export class UIIcon {
    type = input<string>('outlined');
    name = input.required<string>();
    size = input<Size>('md');

    iconClass = computed(() => `material-symbols-${this.type()}`);
    sizeClass = computed(() => {
        switch (this.size()) {
            case 'sm':
                return 'text-sm';
            case 'md':
                return 'text-base';
            case 'lg':
                return 'text-lg';
            case 'xl':
                return 'text-xl';
            case '2xl':
                return 'text-2xl';
            case '3xl':
                return 'text-3xl';
            case '4xl':
                return 'text-4xl';
            case '5xl':
                return 'text-5xl';
            default:
                return 'text-base';
        }
    });
}

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
