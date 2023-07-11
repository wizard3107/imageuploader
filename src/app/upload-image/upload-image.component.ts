import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  selectedImages: { name: string; url: string }[] = [];
  slidePosition: number = 0;
  slideIndex: number = 0;
  previewImage: any = {};

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const selectedFiles: any = [];
    const nonImagefiles: any = []
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      if (file.type.startsWith('image/')) {
        selectedFiles.push(file);
      }
      else{
        nonImagefiles.push(file);
      }
    }
    if(nonImagefiles.length > 0){
      this.showErrorMessage('Only image files are allowed. Please select image files only.');
    }
    this.processSelectedFiles(selectedFiles);
  }
  showErrorMessage(message:any){
    alert(message)
  }
  uploadFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  }

  onFileDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer.files;
    this.processSelectedFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeUploadedFile(image: any) {
    const reImage = this.selectedImages.findIndex(
      (ele) => ele.name === image.name
    );
    this.selectedImages.splice(reImage, 1);
    if (image.name === this.previewImage.name) {
      this.previewImage = {};
    }
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  showImage(image: any) {

    if(this.previewImage.name === image.name){
      this.previewImage = {}
    }
    else{
      this.previewImage = image;
    }
  }
  processSelectedFiles(files: FileList) {
    this.selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImages.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
