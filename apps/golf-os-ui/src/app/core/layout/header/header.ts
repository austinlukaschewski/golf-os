import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UIIcon } from '@golf-os/ui/shared';
import { AuthService } from '@golf-os/user/ui';

@Component({
    selector: 'golf-os-header',
    imports: [CommonModule, UIIcon],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    readonly service = inject(AuthService);
}
