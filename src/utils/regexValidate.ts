export function isImageUrl(text: string) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(text);
}

export function isVideoUrl(text: string) {
  return /^https?:\/\/.+\.(mp4|wmv|avi|mov|avchd|f4v|flv|swf)(\?.*)?$/i.test(
    text
  );
}

export function isUrl(text: string) {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(
    text
  );
}
