export interface UploadFilePayload {
  /** Additional data to pass to server */
  additionalMetadata?: string;

  /** file to upload */
  file?: File;
}