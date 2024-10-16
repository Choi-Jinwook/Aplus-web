import { IconStyleProps } from "@shared/components/Icon";

const Hamburger = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM21 16H3V18H21V16Z"
        fill="black"
      />
    </svg>
  );
};

export default Hamburger;
