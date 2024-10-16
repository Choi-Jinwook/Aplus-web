import { IconStyleProps } from "@shared/components/Icon";

const AppList = ({ size, color }: IconStyleProps) => {
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
        d="M14 8H10V4H14V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20ZM16 8H20V4H16V8ZM14 14H10V10H14V14ZM4 14H8V10H4V14ZM8 20H4V16H8V20ZM10 20H14V16H10V20ZM8 8H4V4H8V8Z"
        fill="black"
      />
    </svg>
  );
};

export default AppList;
