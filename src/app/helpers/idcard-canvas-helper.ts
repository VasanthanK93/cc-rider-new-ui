/* eslint-disable no-use-before-define */

// Type definitions
type CanvasRenderingContext2DExtended = CanvasRenderingContext2D;
type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center';

export async function loadBackground(
  src: string, 
  ctx: CanvasRenderingContext2DExtended, 
  onLoad?: () => void
): Promise<void> {
  const background = await createImage(src);
  ctx.drawImage(background, 0, 0);
  if (onLoad) {
    onLoad();
  }
}

export function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function convertDataUrlToFile(dataURL: string): File {
  const blobBin = atob(dataURL.split(',')[1]);
  const array: number[] = [];
  for (let i = 0; i < blobBin.length; i += 1) {
    array.push(blobBin.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
  const file = new File([blob], 'wccg-certificate.png', { type: blob.type });
  return file;
}

export function drawText(
  ctx: CanvasRenderingContext2DExtended,
  text: string,
  font: string,
  x: number,
  y: number,
  fillStyle: string = 'green',
  align: TextAlign = 'center'
): void {
  ctx.fillStyle = fillStyle;
  ctx.textAlign = align;
  ctx.font = font;
  ctx.fillText(text, x, y);
}

export async function openShareDialog(
  canvas: HTMLCanvasElement,
  fileName: string,
  text: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob: Blob | null) => {
      if (!blob) {
        reject(new Error('Failed to create blob from canvas'));
        return;
      }

      try {
        const file = new File([blob], fileName, { type: blob.type });
        const files = [file];
        
        // Check if Web Share API is supported
        if (!navigator.share) {
          throw new Error('Web Share API not supported');
        }

        await navigator.share({
          text,
          files,
        });
        resolve();
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          reject(err);
        } else {
          resolve(); // AbortError is not considered a failure
        }
      }
    }, 'image/png');
  });
}