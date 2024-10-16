import {
  AppList,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleInformation,
  CircleQuestion,
  CloseButton,
  DeleteButton,
  DotsHorizontal,
  EditButton,
  Hamburger,
  IconClean,
  IconEvent,
  IconFinance,
  IconFood,
  IconHome,
  LikeButton,
  LockClose,
  LockOpen,
  LogoMain,
  Person,
  PersonAdd,
  PlusButton,
  Settings,
} from "@shared/Icons";
import { IconType } from "@shared/types";

interface IconProps extends IconStyleProps {
  icon: IconType;
}

export interface IconStyleProps {
  color?: string;
  size?: string;
}

const Icon = ({ icon, color, size }: IconProps) => {
  switch (icon) {
    case "App_List":
      return <AppList size={size} color={color} />;
    case "Arrow_Down":
      return <ArrowDown size={size} color={color} />;
    case "Arrow_Left":
      return <ArrowLeft size={size} color={color} />;
    case "Arrow_Right":
      return <ArrowRight size={size} color={color} />;
    case "Arrow_Up":
      return <ArrowUp size={size} color={color} />;
    case "Chevron_Down":
      return <ChevronDown size={size} color={color} />;
    case "Chevron_Left":
      return <ChevronLeft size={size} color={color} />;
    case "Chevron_Right":
      return <ChevronRight size={size} color={color} />;
    case "Chevron_Up":
      return <ChevronUp size={size} color={color} />;
    case "Circle_Information":
      return <CircleInformation size={size} color={color} />;
    case "Circle_Question":
      return <CircleQuestion size={size} color={color} />;
    case "Close_Button":
      return <CloseButton size={size} color={color} />;
    case "Delete_Button":
      return <DeleteButton size={size} color={color} />;
    case "Dots_Horizontal":
      return <DotsHorizontal size={size} color={color} />;
    case "Edit_Button":
      return <EditButton size={size} color={color} />;
    case "Hamburger":
      return <Hamburger size={size} color={color} />;
    case "Icon_Clean":
      return <IconClean size={size} color={color} />;
    case "Icon_Event":
      return <IconEvent size={size} color={color} />;
    case "Icon_Finance":
      return <IconFinance size={size} color={color} />;
    case "Icon_Food":
      return <IconFood size={size} color={color} />;
    case "Icon_Home":
      return <IconHome size={size} color={color} />;
    case "Like_Button":
      return <LikeButton size={size} color={color} />;
    case "Lock_Close":
      return <LockClose size={size} color={color} />;
    case "Lock_Open":
      return <LockOpen size={size} color={color} />;
    case "Logo_Main":
      return <LogoMain size={size} color={color} />;
    case "Person_Add":
      return <PersonAdd size={size} color={color} />;
    case "Person":
      return <Person size={size} color={color} />;
    case "Plus_Button":
      return <PlusButton size={size} color={color} />;
    case "Settings":
      return <Settings size={size} color={color} />;
  }
};

export default Icon;
