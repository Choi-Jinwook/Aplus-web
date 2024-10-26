import { IconStyleProps } from "@shared/components/Icon";

const ChevronUp = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.414 15.707L12 11.1209L16.586 15.7069L18 14.2929L12 8.29293L6 14.2929L7.414 15.7069V15.707Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronUp;
