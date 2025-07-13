// components/IDCard.js
import { useEffect, useRef, useState } from 'react';
import { generateIDCard } from '@/app/helpers/idcard-helper';


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

interface IDCardProps {
  rider: Rider;
}

const IDCard = ({ rider }: IDCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [idCardImageHref, setIdCardImageHref] = useState<string>('');

  const showDownloadDialog = () => {
   if (canvasRef.current && downloadLinkRef.current) {
      const img = canvasRef.current.toDataURL('image/png');
      downloadLinkRef.current.href = img;
      downloadLinkRef.current.click();
    }
  };

  const handleDownloadIDCardClicked = () => {
    showDownloadDialog();
  };

  useEffect(() => {
    const generateCard = async () => {
      if (canvasRef.current && rider) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          await generateIDCard(ctx, rider);
          setIdCardImageHref(canvasRef.current.toDataURL('image/png'));
        }
      }
    };

    generateCard();
  }, [rider]);

  return (
    <section>
      <img 
        src={idCardImageHref} 
        alt="My ID Card" 
        style={{ margin: 'auto' }} 
        width="650" 
      />

      <div className="w-full overflow-auto hidden">
        <canvas
          ref={canvasRef}
          className="border"
          width="2054"
          height="1532"
          style={{ margin: 'auto' }}
        />
        <a
          ref={downloadLinkRef}
          className="hidden"
          download={`wccg-idcard-${rider?.riderId}.png`}
        >
          Download
        </a>
      </div>

      <style jsx>{`
        .hidden {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default IDCard;