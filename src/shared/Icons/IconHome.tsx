import { IconStyleProps } from "@shared/components/Icon";

const IconHome = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 22V14C15 13.7348 14.8946 13.4804 14.7071 13.2929C14.5196 13.1054 14.2652 13 14 13H10C9.73478 13 9.48043 13.1054 9.29289 13.2929C9.10536 13.4804 9 13.7348 9 14V22"
        stroke={color ? color : "#A2AEBA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11C2.99993 10.7091 3.06333 10.4216 3.18579 10.1577C3.30824 9.89381 3.4868 9.65979 3.709 9.472L10.709 3.473C11.07 3.16791 11.5274 3.00052 12 3.00052C12.4726 3.00052 12.93 3.16791 13.291 3.473L20.291 9.472C20.5132 9.65979 20.6918 9.89381 20.8142 10.1577C20.9367 10.4216 21.0001 10.7091 21 11V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V11Z"
        stroke={color ? color : "#A2AEBA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconHome;
