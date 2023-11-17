import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageRequirement } from './shared/models/image-requirement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'angular-image-size';

  invalidFormat = false;
  invalidHeight = false;
  invalidWidth = false;
  
  imageRequirement: ImageRequirement = {
    'type': 'image/png',
    'height': 400,
    'width': 600
  };

  form = new FormGroup({
    image: new FormControl(null, [Validators.required]),
  });

  onFileSelected(event: any) {
    let selectedFile = event.target.files[0];
    try {
      const img = new Image();
      img.src = window.URL.createObjectURL(selectedFile);
      img.onload = () => {
        window.URL.revokeObjectURL(img.src);
        this.invalidWidth = !(this.imageRequirement.width === img.naturalWidth);
        this.invalidHeight = !(this.imageRequirement.height === img.naturalHeight);
        this.invalidFormat = !(this.imageRequirement.type === selectedFile.type);
      }
    } catch (error) {
      this.invalidFormat = true;
    }
  }

  isRequiredField(field: string) {
    const form_field: any = this.form.get(field);
    if (!form_field.validator) {
        return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return (validator && validator.required);
  }

}
