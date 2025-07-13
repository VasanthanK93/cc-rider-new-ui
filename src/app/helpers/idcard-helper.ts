import { loadBackground, createImage, drawText } from './idcard-canvas-helper';
import qrcode from 'qrcode';

// Type definitions
interface Rider {
  riderId: string;
  firstName: string;
  lastName: string;
  dob: string; // Date of birth in YYYY-MM-DD format
  bloodGroup: string;
  emergencyNumber: string;
  alternateEmergencyNumber?: string;
  // Add other rider properties as needed
}

type CanvasRenderingContext2DExtended = CanvasRenderingContext2D;
type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center';

const fontName: string = 'Arial';

export function drawName(ctx: CanvasRenderingContext2DExtended, name: string): void {
  ctx.fillStyle = 'green';
  ctx.textAlign = 'center';
  ctx.font = 'bold 60px "Allura"';
  ctx.fillText(name, 690, 380);
}

export async function loadIDCardFrontDesign(
  ctx: CanvasRenderingContext2DExtended, 
  onLoad?: () => void
): Promise<void> {
  const url: string = 'https://res.cloudinary.com/wccg/image/upload/contentful/4XpbKVbQGERiH30i1WhKih/8d0880e01a78e84b94a6a7e182c168f9/rider_id_template_Front.png';
  return loadBackground(url, ctx, onLoad);
}

export async function loadIDCardBackDesign(
  ctx: CanvasRenderingContext2DExtended, 
  onLoad?: () => void
): Promise<void> {
  const url: string = 'https://res.cloudinary.com/wccg/image/upload/contentful/OrwyCir9AMMecIgECAYU9/ba8a49f62a5843d3122566928400d713/rider_id_template_Back.png';
  const background = await createImage(url);
  ctx.drawImage(background, 1032, 0);
}

export async function generateIDCard(
  ctx: CanvasRenderingContext2DExtended, 
  rider: Rider
): Promise<void> {
  const riderId: string = rider.riderId;
  let riderFullName: string = rider.firstName.toUpperCase() + ' ' + rider.lastName.toUpperCase();
  let riderFullNameFontSize: number = 56;
  
  if (riderFullName.length > 22) {
    riderFullName = riderFullName.substring(0, 40);
    riderFullNameFontSize = 1020 / riderFullName.length;
  }
  
  const riderFullNameFont: string = 'bold ' + riderFullNameFontSize + 'px ' + fontName;
  const riderBirthYear: string = rider.dob.substr(0, rider.dob.indexOf('-'));
  
  // TODO: Take care of this logic in the caller
  // delete rider.password; 
  // delete rider.roles;

  // Load Backgrounds
  await loadIDCardFrontDesign(ctx);
  await loadIDCardBackDesign(ctx);

  // Draw text contents on canvas
  drawIDCardText(ctx, riderFullName, 136, 510, riderFullNameFont);
  drawIDCardText(ctx, rider.riderId, 136, 636);
  drawIDCardText(ctx, riderBirthYear, 136, 764);
  drawIDCardText(ctx, rider.bloodGroup, 136, 883);
  drawIDCardText(ctx, rider.emergencyNumber, 330, 1355, 'bold 72px ' + fontName);

  if (rider.alternateEmergencyNumber) {
    drawIDCardText(ctx, rider.alternateEmergencyNumber, 330, 1440, 'bold 72px ' + fontName);
  }

  await drawQrCode(ctx, rider.riderId, 480, 670);
}

function drawIDCardText(
  ctx: CanvasRenderingContext2DExtended,
  text: string,
  x: number,
  y: number,
  font: string = 'bold 56px ' + fontName,
  color: string = 'black',
  align: TextAlign = 'left'
): void {
  drawText(ctx, text, font, x, y, color, align);
}

async function drawQrCode(
  ctx: CanvasRenderingContext2DExtended, 
  text: string, 
  x: number, 
  y: number
): Promise<void> {
  const qrcodeOptions: qrcode.QRCodeToDataURLOptions = { 
    margin: 0, 
    width: 420
  };
  
  const imageSrc: string = await qrcode.toDataURL(text, qrcodeOptions);
  const qrCodeImage: HTMLImageElement = await createImage(imageSrc);
  ctx.drawImage(qrCodeImage, x, y, 420, 420);
}