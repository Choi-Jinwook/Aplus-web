import { IconStyleProps } from "@shared/components/Icon";

const ChevronRight = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.29297 16.586L12.879 12L8.29297 7.414L9.70697 6L15.707 12L9.70697 18L8.29297 16.586Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronRight;
