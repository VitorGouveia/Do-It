import { memo } from "react";

import styles from "./styles.module.scss";

type LogoProps = {
  size?: number;

  children: React.ReactNode;
};

type StopProps = React.SVGProps<SVGStopElement> & {
  color: string;
};

export const Stop: React.FC<StopProps> = ({ color, ...props }) => {
  return <stop stopColor={color} {...props} />;
};

export const UkraineColoring = memo(() => {
  return (
    <>
      <Stop offset="0.5" color="#FFD500" />
      <Stop startOffset="0.5" color="#005BBB" />
    </>
  );
});

type DefaultGradientColoringProps = {
  colors?: string[];
};

export const DefaultGradientColoring: React.FC<DefaultGradientColoringProps> =
  memo(({ colors = ["#4DD3FF", "#0874FF"] }) => {
    return (
      <>
        {colors.map((color, index) => {
          const gradientParts = 1 / colors.length;
          const currentPart = gradientParts * index;

          return (
            <Stop
              key={color}
              color={color}
              offset={gradientParts + currentPart}
            />
          );
        })}
      </>
    );
  });

export const Logo: React.FC<LogoProps> = memo(({ children, size = 1024 }) => {
  return (
    <div className={styles.logoContainer}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="1024"
          height="1024"
          rx="230"
          fill="url(#paint0_linear_281_237)"
        />
        <g filter="url(#filter0_d_281_237)">
          <rect
            x="753.652"
            y="226.051"
            width="155.34"
            height="621.359"
            rx="25"
            transform="rotate(45 753.652 226.051)"
            fill="url(#paint1_linear_281_237)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M533.968 665.419L441.804 757.583C432.041 767.346 416.212 767.346 406.449 757.583L178.184 529.318C168.421 519.555 168.421 503.726 178.184 493.963L252.67 419.476C262.433 409.713 278.263 409.713 288.026 419.476L533.968 665.419Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_281_237"
            x="120.862"
            y="211.407"
            width="782.277"
            height="628.499"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="25" />
            <feGaussianBlur stdDeviation="25" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_281_237"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_281_237"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_281_237"
            x1="0"
            y1="0"
            x2="0"
            y2="1024"
            gradientUnits="userSpaceOnUse"
          >
            {children}
          </linearGradient>
          <linearGradient
            id="paint1_linear_281_237"
            x1="753.652"
            y1="226.051"
            x2="753.652"
            y2="847.411"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgb(255, 255, 255)" />
            <stop offset="1" stopColor="rgb(255, 255, 255, 0.8)" />
          </linearGradient>
        </defs>
      </svg>

      <strong className={styles.heading}>Notely</strong>
    </div>
  );
});

export default Logo;
