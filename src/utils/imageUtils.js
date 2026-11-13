/**
 * Compresses and resizes an image using Canvas before upload.
 * @param {string} dataUrl - base64 data URL from FileReader
 * @param {number} maxWidth - max output width in px (default 800)
 * @param {number} quality - JPEG quality 0–1 (default 0.82)
 * @returns {Promise<string>} compressed base64 data URL
 */
export const compressImage = (dataUrl, maxWidth = 800, quality = 0.82) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Scale down if wider than maxWidth
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Output as JPEG for best compression
      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.src = dataUrl;
  });
};
