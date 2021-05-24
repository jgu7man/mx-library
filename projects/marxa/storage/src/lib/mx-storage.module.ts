import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MxUploadFilesComponent } from './components/upload-files/upload-files.component';
import { MxUploadModalComponent } from './components/upload-modal/upload-modal.component';
import { MxUploadingSpinnerComponent } from './components/uploading-spinner/uploading-spinner.component';
import { MaterialModule } from '../shared/material.module';
import { MxImportFileComponent } from './components/import-file/import-file.component';
import { DialogImportComponent } from './components/dialog-import/dialog-import.component';
import { DialogRenameColumnsComponent } from './components/dialog-rename-columns/dialog-rename-columns.component';
import { ErrorColumnsRequiredComponent } from './components/import-file/error-columns-required/error-columns-required.component';

@NgModule({
  declarations: [
    MxUploadFilesComponent,
    MxUploadModalComponent,
    MxUploadingSpinnerComponent,
    MxImportFileComponent,
    DialogImportComponent,
    DialogRenameColumnsComponent,
    ErrorColumnsRequiredComponent,
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    MaterialModule,
  ],
  exports: [
    MxUploadFilesComponent,
    MxUploadModalComponent,
    MxImportFileComponent
  ],
})
export class MxStorageModule {}
