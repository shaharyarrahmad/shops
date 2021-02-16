import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'content-block-detail',
    styleUrls: ['./block-detail.component.scss'],
    templateUrl: './block-detail.component.html',
})
export class BlockDetailComponent {

    detailForm: FormGroup;
    descriptionWordCount = 0;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.detailForm = this.formBuilder.group({
            title: ['', Validators.required],
            slug: '',
            author: '',
            featuredImage: '',
            description: '',
            body: ['', Validators.required]
        });
    }

    updateSlug(title: string): void {
        if (!title) {
            return this.detailForm.setValue({slug: ''});
        }
        this.detailForm.patchValue({slug: title.replace(/\s+/g, '-').toLowerCase()});
    }

    save(): void {
        console.log(`Saving ${this.detailForm.getRawValue()}`)
    }
    cancel(): void {
        if (window.confirm(`Are you sure?`)) {
            this.router.navigate(['../simple-cms']);
        }
    }

    countWords(): void {
        this.descriptionWordCount = this.detailForm.getRawValue().description?.length || 0
    }


}