"use client"

interface AnimatedLogoProps {
  isAnimating: boolean
  variant: "light" | "dark"
}

export function AnimatedLogo({ isAnimating, variant }: AnimatedLogoProps) {
  const strokeColor = variant === "light" ? "#0f172a" : "#FFFFFF"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      className="h-[28rem] w-auto"
    >
      {/* Main circle - inflates then quickly deflates at the end */}
      <circle cx="250" cy="250" r="150.5" stroke={strokeColor} strokeWidth="32">
        {isAnimating && (
          <animate
            attributeName="r"
            values="150.5;170;150.5"
            keyTimes="0;0.85;1"
            dur="3s"
            fill="freeze"
          />
        )}
      </circle>

      {/* Face - only show when animating */}
      {isAnimating && (
        <>
          {/* Left eye - static dot */}
          <circle cx="220" cy="220" r="10" fill={strokeColor} />

          {/* Right eye - static dot */}
          <circle cx="280" cy="220" r="10" fill={strokeColor} />

          {/* :D smile - wide happy mouth */}
          <path
            d="M 210 270 Q 250 310 290 270"
            stroke={strokeColor}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  )
}
