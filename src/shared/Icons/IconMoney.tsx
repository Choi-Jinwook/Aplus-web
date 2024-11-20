import { IconStyleProps } from "@shared/components/Icon";

const IconMoney = ({ size, color }: IconStyleProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="10" fill="#FFEADA" />
      <path
        d="M15.9981 19.48C15.5528 19.48 15.1728 19.3217 14.8581 19.005C14.5434 18.6883 14.3861 18.3073 14.3861 17.862C14.3861 17.4167 14.5444 17.0367 14.8611 16.722C15.1778 16.4073 15.5591 16.25 16.0051 16.25C16.4511 16.25 16.8311 16.4087 17.1451 16.726C17.4591 17.0433 17.6164 17.4243 17.6171 17.869C17.6178 18.3137 17.4591 18.6937 17.1411 19.009C16.8231 19.3243 16.4421 19.4817 15.9981 19.481M12.3761 11.75H19.6261L20.9011 9.161C21.0424 8.89233 21.0364 8.63167 20.8831 8.379C20.7298 8.12633 20.4998 8 20.1931 8H11.8091C11.5024 8 11.2724 8.12633 11.1191 8.379C10.9658 8.63167 10.9598 8.89267 11.1011 9.162L12.3761 11.75ZM12.6321 24H19.3701C20.6568 24 21.7502 23.8817 22.6502 22.981C23.5509 22.0803 24.0012 20.985 24.0012 19.695C24.0012 19.1563 23.9089 18.6317 23.7242 18.121C23.5395 17.6103 23.2729 17.1453 22.9242 16.726L19.8821 12.75H12.1201L9.07572 16.726C8.72705 17.1453 8.46038 17.6103 8.27572 18.121C8.09105 18.631 7.99872 19.1557 7.99872 19.695C7.99872 20.985 8.44905 22.0803 9.34972 22.981C10.2504 23.8817 11.3461 24 12.6321 24Z"
        fill="#EC680A"
      />
    </svg>
  );
};

export default IconMoney;