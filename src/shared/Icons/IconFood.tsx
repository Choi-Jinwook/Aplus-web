import { IconStyleProps } from "@shared/components/Icon";

const IconFood = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 3V16H18C16.9 16 16 15.1 16 14V8C16 6.67392 16.5268 5.40215 17.4645 4.46447C18.4021 3.52678 19.6739 3 21 3Z"
        fill={color}
      />
      <path
        d="M21 16V3C19.6739 3 18.4021 3.52678 17.4645 4.46447C16.5268 5.40215 16 6.67392 16 8V14C16 15.1 16.9 16 18 16H21ZM21 16V24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 9C11 12.5899 9.5 15 6 15C2.5 15 1 12.5899 1 9C1 5.41015 3 2 6 2C9 2 11 5.41015 11 9Z"
        fill={color}
      />
      <path
        d="M4.5 15C4.5 14.1716 5.17157 13.5 6 13.5C6.82843 13.5 7.5 14.1716 7.5 15V23.5C7.5 24.3284 6.82843 25 6 25C5.17157 25 4.5 24.3284 4.5 23.5V15Z"
        fill={color}
      />
      <rect x="19" y="14" width="3" height="11" rx="1.5" fill={color} />
    </svg>
  );
};

export default IconFood;
