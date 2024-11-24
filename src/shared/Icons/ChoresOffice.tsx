import { IconStyleProps } from "@shared/components/Icon";

const ChoresOffice = ({ size = 32, color = "#A2AEBA" }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4 4V24H16.4V4H12.4ZM16.4 6.66667L21.7334 24L25.7334 22.6667L20.4 5.33333L16.4 6.66667ZM7.06669 6.66667V24H11.0667V6.66667H7.06669ZM4.40002 25.3333V28H28.4V25.3333H4.40002Z"
        fill={color}
      />
    </svg>
  );
};

export default ChoresOffice;
