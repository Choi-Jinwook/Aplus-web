import { IconStyleProps } from "@shared/components/Icon";

const ArrowUp = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 19.9194H11V7.90903L5.49477 13.4142L4.08057 12L12 4.08063L19.9194 12L18.5052 13.4142L13 7.90903V19.9194Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowUp;
