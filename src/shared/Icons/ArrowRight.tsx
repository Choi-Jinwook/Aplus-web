import { IconStyleProps } from "@shared/components/Icon";

const ArrowRight = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.08057 11V13H16.091L10.5858 18.5052L12 19.9194L19.9194 12L12 4.08063L10.5858 5.49483L16.091 11H4.08057Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRight;
