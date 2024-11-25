import { IconStyleProps } from "@shared/components/Icon";

const ChoresKitchen = ({ size = 32, color = "#A2AEBA" }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.8667 2.66699H9.53337C8.20003 2.66699 6.8667 4.00033 6.8667 5.33366V12.667H25.5334V5.33366C25.5334 4.00033 24.2 2.66699 22.8667 2.66699ZM25.5334 14.0003H6.8667V24.0003C6.8667 25.3337 8.20003 26.667 9.53337 26.667V28.0003H12.2V26.667H20.2V28.0003H22.8667V26.667C24.2 26.667 25.5334 25.3337 25.5334 24.0003V14.0003ZM9.53337 5.33366H8.20003V10.667H9.53337V5.33366ZM8.20003 16.0003H9.53337V24.0003H8.20003V16.0003Z"
        fill={color}
      />
    </svg>
  );
};

export default ChoresKitchen;
