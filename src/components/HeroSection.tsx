import React from 'react';

interface HeroSectionProps {
  title: string;
  buttonText: string;
  gradientColor: string;
  onClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  buttonText,
  gradientColor,
  onClick,
}) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">{title}</h1>
      <button
        className="hero-button"
        style={{ background: `linear-gradient(to right, ${gradientColor}, #ffffff)` }}
        onClick={onClick}
        aria-label="Lanzar aplicación"
      >
        <span className="hero-icon">🚀</span>
      </button>
    </div>
  );
};

export default HeroSection;