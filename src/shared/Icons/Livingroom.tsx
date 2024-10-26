import { IconStyleProps } from "@shared/components/Icon";

const Livingroom = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8.15V6C5 4.9 5.9 4 7 4H17C18.1 4 19 4.9 19 6V8.16C17.84 8.57 17 9.67 17 10.97V13H7V10.96C7 9.67 6.16 8.56 5 8.15ZM20 9C18.9 9 18 9.9 18 11V14H6V11C6 10.4696 5.78929 9.96086 5.41421 9.58579C5.03914 9.21071 4.53043 9 4 9C3.46957 9 2.96086 9.21071 2.58579 9.58579C2.21071 9.96086 2 10.4696 2 11V16C2 17.1 2.9 18 4 18V20H6V18H18V20H20V18C21.1 18 22 17.1 22 16V11C22 9.9 21.1 9 20 9Z"
        fill={color}
      />
    </svg>
  );
};

export default Livingroom;
