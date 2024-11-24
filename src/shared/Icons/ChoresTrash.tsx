import { IconStyleProps } from "@shared/components/Icon";

const ChoresTrash = ({ size = 32, color = "#A2AEBA" }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V5.33333H5.33331V8H6.66665V25.3333C6.66665 26.0406 6.9476 26.7189 7.44769 27.219C7.94779 27.719 8.62607 28 9.33331 28H22.6666C23.3739 28 24.0522 27.719 24.5523 27.219C25.0524 26.7189 25.3333 26.0406 25.3333 25.3333V8H26.6666V5.33333H20V4H12ZM12 10.6667H14.6666V22.6667H12V10.6667ZM17.3333 10.6667H20V22.6667H17.3333V10.6667Z"
        fill={color}
      />
    </svg>
  );
};

export default ChoresTrash;
