import { IconStyleProps } from "@shared/components/Icon";

const ChoresDish = ({ size = 32, color = "#A2AEBA" }: IconStyleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6214 7.4877L22.5269 4.24724C22.619 3.91759 23.1143 3.91759 23.2064 4.24724L24.1119 7.4877C24.4016 8.52435 25.2034 9.36502 26.2647 9.74483L27.9731 10.3562C28.2756 10.4645 28.2756 10.8688 27.9731 10.9771L26.2647 11.5885C25.2034 11.9683 24.4016 12.809 24.1119 13.8456L23.2064 17.0861C23.1143 17.4157 22.619 17.4157 22.5269 17.0861L21.6214 13.8456C21.3318 12.809 20.5299 11.9683 19.4686 11.5885L17.7602 10.9771C17.4577 10.8688 17.4577 10.4645 17.7602 10.3562L19.4686 9.74483C20.5299 9.36502 21.3318 8.52435 21.6214 7.4877Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.076 5.03202L20.4994 7.08112C20.3207 7.71653 19.8504 8.26863 19.1893 8.57718C18.2658 8.20492 17.2568 8 16.2 8C11.7817 8 8.20001 11.5817 8.20001 16C8.20001 20.4183 11.7817 24 16.2 24C19.823 24 22.8835 21.5917 23.8679 18.2886C24.0563 18.121 24.209 17.8948 24.2907 17.6044L25.2339 14.2522C25.4334 13.5434 25.9955 12.9383 26.7807 12.6592L27.6364 12.3551C28.0025 13.5046 28.2 14.7292 28.2 16C28.2 22.6274 22.8274 28 16.2 28C9.5726 28 4.20001 22.6274 4.20001 16C4.20001 9.37258 9.5726 4 16.2 4C17.9361 4 19.5861 4.36868 21.076 5.03202ZM17.6265 9.14546L17.1731 9.3066C15.8756 9.76772 15.8756 11.5656 17.1731 12.0267L18.9527 12.6592C19.7378 12.9383 20.3 13.5434 20.4994 14.2522L21.4426 17.6044C21.6274 18.2612 22.175 18.5893 22.6792 18.6544C21.6335 21.2042 19.1265 23 16.2 23C12.334 23 9.20001 19.866 9.20001 16C9.20001 12.134 12.334 9 16.2 9C16.6888 9 17.1659 9.0501 17.6265 9.14546Z"
        fill={color}
      />
      <path
        d="M27.5774 4.41084L28.0301 2.79061C28.0762 2.62578 28.3238 2.62579 28.3699 2.79061L28.8226 4.41084C28.9674 4.92917 29.3683 5.3495 29.899 5.53941L30.7532 5.8451C30.9045 5.89924 30.9045 6.10141 30.7532 6.15555L29.899 6.46124C29.3683 6.65115 28.9674 7.07149 28.8226 7.58981L28.3699 9.21004C28.3238 9.37487 28.0762 9.37487 28.0301 9.21004L27.5774 7.58981C27.4325 7.07148 27.0316 6.65115 26.501 6.46124L25.6468 6.15555C25.4955 6.10141 25.4955 5.89924 25.6468 5.8451L26.501 5.53941C27.0316 5.3495 27.4325 4.92917 27.5774 4.41084Z"
        fill={color}
      />
    </svg>
  );
};

export default ChoresDish;