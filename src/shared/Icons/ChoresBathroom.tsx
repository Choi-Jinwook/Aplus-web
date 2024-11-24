import { IconStyleProps } from "@shared/components/Icon";

const ChoresBathroom = ({ size = 32, color = "#A2AEBA" }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.8 20V18.6667H30.1333V16H27.4667H3.46667V18.6667H4.80001V20C4.79936 21.2086 5.12793 22.3945 5.75044 23.4305C6.37294 24.4664 7.26587 25.3132 8.33334 25.88L7.46667 28H10.1333L10.8 26.6667H22.8L23.4667 28H26.1333L25.2667 25.88C27.3733 24.76 28.8 22.5467 28.8 20Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.8 3.99967C23.3272 3.99967 22.1333 5.19358 22.1333 6.66634V10.6663H19.4667L19.4667 6.66634C19.4667 3.72082 21.8545 1.33301 24.8 1.33301C27.7455 1.33301 30.1333 3.72082 30.1333 6.66634V17.333H27.4667V6.66634C27.4667 5.19358 26.2728 3.99967 24.8 3.99967Z"
        fill={color}
      />
      <path
        d="M15.4667 8.66699C15.4667 7.56242 16.3621 6.66699 17.4667 6.66699H24.1333C25.2379 6.66699 26.1333 7.56242 26.1333 8.66699V10.667H15.4667V8.66699Z"
        fill={color}
      />
    </svg>
  );
};

export default ChoresBathroom;
