import { IconStyleProps } from "@shared/components/Icon";

const LockOpen = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 8.5C19.104 8.5 20 9.396 20 10.5V20.5C20 21.604 19.104 22.5 18 22.5H6C4.895 22.5 4 21.604 4 20.5V10.5C4 9.396 4.895 8.5 6 8.5H15V6.5C15 4.84326 13.6569 3.5 12 3.5C10.3431 3.5 9 4.84326 9 6.5H7C7 3.73877 9.239 1.5 12 1.5C14.761 1.5 17 3.73877 17 6.5V8.5H18ZM6 20.5H18V10.5H6V20.5ZM10 15.5C10 16.604 10.895 17.5 12 17.5C13.104 17.5 14 16.604 14 15.5C14 14.396 13.104 13.5 12 13.5C10.895 13.5 10 14.396 10 15.5Z"
        fill={color}
      />
    </svg>
  );
};

export default LockOpen;
