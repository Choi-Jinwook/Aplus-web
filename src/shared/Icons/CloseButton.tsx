import { IconStyleProps } from "@shared/components/Icon";

const CloseButton = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 5L19.09 3.59L12 10.59L4.99997 3.5L3.58997 4.91L10.59 12L3.58997 19L4.99996 20.41L12 13.41L19.09 20.41L20.5 19L13.41 12L20.5 5Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseButton;
