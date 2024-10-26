import { IconStyleProps } from "@shared/components/Icon";

const ChevronDown = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.586 8.29291L12 12.879L7.414 8.29301L6 9.70701L12 15.707L18 9.70701L16.586 8.29301L16.586 8.29291Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronDown;
