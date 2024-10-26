import { IconStyleProps } from "@shared/components/Icon";

const Kitchen = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_142_213"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="3"
        y="2"
        width="18"
        height="19"
      >
        <path
          d="M17.1429 3H6.85714C6.38376 3 6 3.39797 6 3.88889V18.1111C6 18.602 6.38376 19 6.85714 19H17.1429C17.6162 19 18 18.602 18 18.1111V3.88889C18 3.39797 17.6162 3 17.1429 3Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 10L20 10"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 18V20M8 18V20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path d="M7 4V8" stroke={color} />
        <path d="M7 12V18" stroke={color} />
      </mask>
      <g mask="url(#mask0_142_213)">
        <path d="M0 0H24V24H0V0Z" fill={color} />
      </g>
    </svg>
  );
};

export default Kitchen;
