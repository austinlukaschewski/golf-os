import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import type { LoginRequest } from '@golf-os/types';
import { UIIcon } from '@golf-os/ui/shared';

import { take } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'user-login',
    imports: [CommonModule, ReactiveFormsModule, UIIcon],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    private readonly _router = inject(Router);
    private readonly _service = inject(AuthService);

    isSubmitting = signal<boolean>(false);

    form = new FormGroup({
        username: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.compose([Validators.required])),
    });

    onSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.isSubmitting.set(true);

        this._service
            .login(this.form.value as LoginRequest)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this._router.navigate(['/']);
                    this.isSubmitting.set(false);
                },
                error: (error) => {
                    console.error('Login failed:', error);
                    this.isSubmitting.set(false);
                },
                complete: () => {
                    this.isSubmitting.set(false);
                },
            });
    }
}
