import { IconStyleProps } from "@shared/components/Icon";

const LockClose = ({ size, color }: IconStyleProps) => {
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
        d="M18 8.5C19.104 8.5 20 9.396 20 10.5V20.5C20 21.6041 19.104 22.5 18 22.5H6C4.895 22.5 4 21.6041 4 20.5V10.5C4 9.396 4.895 8.5 6 8.5H7V6.5C7 3.739 9.239 1.5 12 1.5C14.761 1.5 17 3.739 17 6.5V8.5H18ZM6 10.5H18V20.5H6V10.5ZM10 15.5C10 16.6041 10.895 17.5 12 17.5C13.104 17.5 14 16.6041 14 15.5C14 14.396 13.104 13.5 12 13.5C10.895 13.5 10 14.396 10 15.5ZM9.0006 6.502C9.0006 4.8451 10.3437 3.502 12.0006 3.502C13.6574 3.502 15.0006 4.8451 15.0006 6.502V8.502H9.0006V6.502Z"
        fill="black"
      />
    </svg>
  );
};

export default LockClose;
