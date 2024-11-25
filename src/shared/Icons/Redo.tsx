import { IconStyleProps } from "@shared/components/Icon";

const Redo = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.0003 8H19.0003V3M18.7103 16.357C17.7787 17.7921 16.4117 18.8907 14.8097 19.4917C13.2078 20.0926 11.4554 20.1641 9.80985 19.6957C8.16429 19.2273 6.71224 18.2436 5.66688 16.8892C4.62153 15.5348 4.03793 13.8809 4.00179 12.1703C3.96564 10.4598 4.47884 8.78269 5.46604 7.3853C6.45325 5.98791 7.86244 4.94382 9.48675 4.40633C11.1111 3.86883 12.8649 3.86623 14.4908 4.39893C16.1167 4.93162 17.5289 5.97154 18.5203 7.366"
        stroke="#444B54"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Redo;
