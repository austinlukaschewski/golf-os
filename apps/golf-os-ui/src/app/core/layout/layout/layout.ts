import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { take } from 'rxjs';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
    selector: 'golf-os-layout',
    imports: [CommonModule, ReactiveFormsModule, Header, Footer],
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
})
export class Layout {
    private readonly _http = inject(HttpClient);

    form = new FormGroup({
        name: new FormControl(null, Validators.compose([Validators.required])),
        file: new FormControl<File | null>(null, Validators.compose([Validators.required])),
    });

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.form.controls['file'].patchValue(file);
        }
    }

    onSubmit(): void {
        // const data = new FormData();
        // data.append('file', this.form.get('file')?.value);

        console.log(this.form.value);
        const formData = new FormData();

        const formValue: any = this.form.value;
        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            formData.append(key, value);
        }

        this._http
            .post('/api/files/upload', formData)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    console.log('File uploaded successfully:', response);
                },
                error: (error) => {
                    console.error('Error uploading file:', error);
                },
            });
    }
}
