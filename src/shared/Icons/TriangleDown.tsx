import { IconStyleProps } from "@shared/components/Icon";

const TriangleDown = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17L6.80385 9.5L17.1962 9.5L12 17Z" fill="#5A6675" />
    </svg>
  );
};

export default TriangleDown;
