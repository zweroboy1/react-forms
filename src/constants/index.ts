export const MAX_FILE_SIZE = 512_000;
export const IMAGE_SIZE_ERROR = `The image size should be up to ${Math.round(
  MAX_FILE_SIZE / 1024
)}Kb`;
export const IMAGE_FORMATS = ['image/png', 'image/jpeg'];
export const IMAGE_FORMAT_ERROR = 'Only PNG or JPEG format';
