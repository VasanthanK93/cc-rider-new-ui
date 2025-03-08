/* eslint-disable no-use-before-define */
/**
 * Loads background image to the context
 * @param {string} src
 * @param {CanvasRenderingContext2D} ctx
 */
export const loadBackground = async (
  src: string,
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const background = await createImage(src);
  ctx.drawImage(background, 0, 0);
};

/**
 * Creates an image from URL or address
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
const createImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const loadNov2020CertificateBackground = async (
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const url =
    'https://res.cloudinary.com/wccg/image/upload/contentful/6NS9GVoTPshaqPb4mLYBkw/2a1467d91121b653f2a32682225011f4/NovChallengeCertificate.jpeg';
  return loadBackground(url, ctx);
};

export const loadYearInRideBackground = async (
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const url =
    'https://res.cloudinary.com/wccg/image/upload/contentful/6AhdleAS8jDK62xPXaJLxR/7e5d36a4c5d6931ed7599e2ca15e93dc/IMG_6058.jpeg';
  return loadBackground(url, ctx);
};

export const loadYearInRunBackground = async (
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const url =
    'https://res.cloudinary.com/wccg/image/upload/contentful/5Rkaq24wn9UDD5XhRLVJ3z/a03ddd17be6a9355ab8f6a46cfdab11a/IMG_6059.jpeg';
  return loadBackground(url, ctx);
};

export const loadIDCardFrontDesign = async (
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const url =
    'https://res.cloudinary.com/wccg/image/upload/contentful/4XpbKVbQGERiH30i1WhKih/8d0880e01a78e84b94a6a7e182c168f9/rider_id_template_Front.png';
  return loadBackground(url, ctx);
};

export const loadIDCardBackDesign = async (
  ctx: CanvasRenderingContext2D,
): Promise<void> => {
  const url =
    'https://res.cloudinary.com/wccg/image/upload/contentful/OrwyCir9AMMecIgECAYU9/ba8a49f62a5843d3122566928400d713/rider_id_template_Back.png';
  const background = await createImage(url);
  ctx.drawImage(background, 1032, 0);
};

export const convertDataUrlToFile = (dataURL: string): File => {
  const blobBin = atob(dataURL.split(',')[1]);
  const array: number[] = [];
  for (let i = 0; i < blobBin.length; i += 1) {
    array.push(blobBin.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
  const file = new File([blob], 'wccg-certificate.png', { type: blob.type });
  return file;
};

export const drawName = (ctx: CanvasRenderingContext2D, name: string): void => {
  ctx.fillStyle = 'green';
  ctx.textAlign = 'center';
  ctx.font = 'bold 60px "Allura"';
  ctx.fillText(name, 690, 380);
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font: string,
  x: number,
  y: number,
  fillStyle: string = 'green',
  align: CanvasTextAlign = 'center',
): void => {
  ctx.fillStyle = fillStyle;
  ctx.textAlign = align;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

export const generateYearInRideDashboard = async (
  canvas: HTMLCanvasElement,
  name: string,
  stats: any,
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  await loadYearInRideBackground(ctx);

  ctx.textAlign = 'center';

  ctx.font = 'bold 68px Arial';
  ctx.fillStyle = 'white';

  ctx.fillText(stats.halfCenturyCount || 0, 560, 700);
  const elapsedMovingTime = `${Math.round(stats.elapsedTime / 60 / 60)} / ${Math.round(stats.movingTime / 60 / 60)} hrs`;
  ctx.fillText(elapsedMovingTime, 2560, 1120, 425);
  const commuteDistance = `${Math.round(stats.commuteDistance / 1000)} kms`;
  ctx.fillText(`${stats.commuteCount} (${commuteDistance})`, 560, 1530, 425);

  ctx.fillStyle = 'black';

  const longestDistance = `${Math.round(stats.longestDistance / 1000)} kms`;
  ctx.fillText(longestDistance || '0', 2450, 700);
  ctx.fillText(stats.centuryCount || 0, 450, 1120);
  const distance = `${Math.round(stats.distance / 1000)} kms`;
  ctx.fillText(distance, 2450, 1530);

  ctx.font = 'bold 60px Arial';
  ctx.fillText(`${stats.count} RIDES`, 1475, 1860);

  ctx.fillStyle = '#098139';
  ctx.font = 'bold 80px Arial';
  ctx.fillText(name, 1475, 1760);
};

export const generateYearInRunDashboard = async (
  canvas: HTMLCanvasElement,
  name: string,
  stats: any,
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  await loadYearInRunBackground(ctx);

  ctx.textAlign = 'center';
  ctx.font = 'bold 68px Arial';
  ctx.fillStyle = 'white';

  ctx.fillText(stats.fullMarathonCount || 0, 560, 700);
  ctx.fillText(
    `${stats.fiveKmsCount || 0} / ${stats.tenKmsCount || 0}`,
    560,
    1530,
    425,
  );
  const elapsedMovingTime = `${Math.round(stats.elapsedTime / 60 / 60)} / ${Math.round(stats.movingTime / 60 / 60)} hrs`;
  ctx.fillText(elapsedMovingTime, 2560, 1120, 425);

  ctx.fillStyle = 'black';
  const longestDistance = `${Math.round(stats.longestDistance / 1000)} kms`;
  ctx.fillText(longestDistance, 2450, 700);
  ctx.fillText(stats.halfMarathonCount || 0, 450, 1120);
  const distance = `${Math.round(stats.distance / 1000)} kms`;
  ctx.fillText(distance, 2450, 1530);

  ctx.font = 'bold 60px Arial';
  ctx.fillText(`${stats.count} RUNS`, 1475, 1860);

  ctx.fillStyle = '#098139';
  ctx.font = 'bold 80px Arial';
  ctx.fillText(name, 1475, 1760);
};

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} fileName
 * @param {string} text
 */
export const openShareDialog = async (
  canvas: HTMLCanvasElement,
  fileName: string,
  text: string,
): Promise<void> => {
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    try {
      const file = new File([blob], fileName, { type: blob.type });
      const files = [file];
      await navigator.share({
        text,
        files,
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        throw err;
      }
    }
  }, 'image/png');
};

/**
 * Creates event participant poster
 * @param {HTMLCanvasElement} canvas
 * @param {string} image
 */
export const generateParticipationPoster = async (
  canvas: HTMLCanvasElement,
  image: string,
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const frameUrl =
    'https://res.cloudinary.com/wccg/image/upload/f_auto,c_limit,w_1200,q_auto/contentful/3TIemYxOb3Ux8iu49RzGCf/7e396956ae38805da097b2f9b729850b/Participant_Card_-_Frame_V5_-_Trans.png';
  const userImage = await createImage(image);
  const frameImage = await createImage(frameUrl);
  ctx.drawImage(userImage, 45, 45, 950, 950);
  ctx.drawImage(frameImage, 0, 0);
};
