import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  textColor: string;
}

const SocialButtons: React.FC<SocialButtonProps> = ({
  icon,
  text,
  bgColor,
  textColor,
}) => {
  return (
    <button
      className="flex items-center justify-center w-full py-3 my-2 rounded-md font-semibold"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <span className="mr-2">{icon}</span> {text}
    </button>
  );
};

export default SocialButtons;
