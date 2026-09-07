import React from 'react';

interface AdventistLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  customLogoUrl?: string;
}

export const AdventistLogo: React.FC<AdventistLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
  textColor = 'text-white',
  customLogoUrl,
}) => {
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Logo GMAHK Jemaat Salili"
          className="object-contain rounded-full shadow-sm"
          style={{ width: size, height: size }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback if custom image fails to load
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {showText && (
          <div className="leading-tight">
            <span className={`block font-bold tracking-wider text-sm uppercase ${textColor}`}>
              GMAHK
            </span>
            <span className={`block text-xs font-medium tracking-normal opacity-90 ${textColor}`}>
              Jemaat Salili • Siau Tengah
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Seventh-day Adventist Symbolic Emblem (Open Bible, Cross, Holy Spirit 3 Flames) */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-2 shadow-md ring-1 ring-amber-400/40"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame 1 (Left Wing) */}
          <path
            d="M 32,56 C 26,42 34,26 44,16 C 41,27 46,38 48,46 C 44,48 38,50 32,56 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          {/* Flame 2 (Center Holy Spirit flame) */}
          <path
            d="M 50,12 C 54,24 55,34 50,48 C 52,38 58,26 62,20 C 58,32 60,42 56,54 C 54,46 52,34 50,12 Z"
            fill="#FBBF24"
          />
          {/* Flame 3 (Right Wing) */}
          <path
            d="M 68,56 C 74,42 66,26 56,16 C 59,27 54,38 52,46 C 56,48 62,50 68,56 Z"
            fill="#F59E0B"
            opacity="0.95"
          />
          {/* Center Cross */}
          <rect x="47.5" y="24" width="5" height="42" rx="1.5" fill="#FFFFFF" />
          <rect x="36" y="34" width="28" height="5" rx="1.5" fill="#FFFFFF" />
          {/* Open Bible at Base */}
          <path
            d="M 22,64 C 36,60 48,64 50,68 C 52,64 64,60 78,64 C 74,74 58,73 50,78 C 42,73 26,74 22,64 Z"
            fill="#FFFFFF"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          {/* Bible Pages Lines */}
          <path d="M 26,67 C 35,64 45,67 48,70" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
          <path d="M 74,67 C 65,64 55,67 52,70" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <span className={`block font-bold tracking-wider text-sm uppercase ${textColor}`}>
            GMAHK
          </span>
          <span className={`block text-xs font-medium tracking-normal opacity-90 ${textColor}`}>
            Jemaat Salili • Siau Tengah
          </span>
        </div>
      )}
    </div>
  );
};
