import { IconStyleProps } from "@shared/components/Icon";

const ArrowDown = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 4.08063H13V16.091L18.5052 10.5858L19.9194 12L12 19.9194L4.08057 12L5.49477 10.5858L11 16.091V4.08063Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDown;
