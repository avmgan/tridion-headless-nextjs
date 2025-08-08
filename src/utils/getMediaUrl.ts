const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7138';

/**
 * Returns the middleware-delivered media URL.
 * Supports optional resize parameters (width, height, mode).
 * - Width only: adds `_w{width}_{mode}`
 * - Height only: adds `_h{height}_{mode}`
 * - Both: adds `_w{width}_h{height}_{mode}`
 */
export function getMediaUrl(
  mediaUrl: string, // e.g. "/fr-fr/media/ballon-burner_tcm5-294.webp"
  width?: number,
  height?: number,
  mode = 'n'
): string {
  const urlParts = mediaUrl.split('/');
  const filenameWithExt = urlParts.pop(); // "ballon-burner_tcm5-294.webp"
  const basePath = urlParts.join('/'); // e.g. "/fr-fr/media"

  if (!filenameWithExt || !basePath.endsWith('media')) {
    console.warn('Unexpected media URL format:', mediaUrl);
    return mediaUrl; // fallback to original
  }

  const lastDot = filenameWithExt.lastIndexOf('.');
  const filename = filenameWithExt.slice(0, lastDot);
  const ext = filenameWithExt.slice(lastDot); // e.g. ".webp"

  // No resize parameters → return original
  if (!width && !height) {
    return `${API_BASE}${basePath}/${filenameWithExt}`;
  }

  // Width only
  if (width && !height) {
    return `${API_BASE}${basePath}/${filename}_w${width}_${mode}${ext}`;
  }

  // Height only
  if (!width && height) {
    return `${API_BASE}${basePath}/${filename}_h${height}_${mode}${ext}`;
  }

  // Both width and height
  return `${API_BASE}${basePath}/${filename}_w${width}_h${height}_${mode}${ext}`;
}
