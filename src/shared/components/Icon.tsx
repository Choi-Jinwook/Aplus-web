import {
  AppList,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
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

interface IconProps {
  icon: IconType;
}

const Icon = ({ icon }: IconProps) => {
  switch (icon) {
    case "App_List":
      return <AppList />;
    case "Arrow_Down":
      return <ArrowDown />;
    case "Arrow_Left":
      return <ArrowLeft />;
    case "Arrow_Right":
      return <ArrowRight />;
    case "Arrow_Up":
      return <ArrowUp />;
    // case "Chevron_Down":
    //   return <ChevronDown />;
    case "Chevron_Left":
      return <ChevronLeft />;
    case "Chevron_Right":
      return <ChevronRight />;
    case "Chevron_Up":
      return <ChevronUp />;
    case "Circle_Information":
      return <CircleInformation />;
    case "Circle_Question":
      return <CircleQuestion />;
    case "Close_Button":
      return <CloseButton />;
    case "Delete_Button":
      return <DeleteButton />;
    case "Dots_Horizontal":
      return <DotsHorizontal />;
    case "Edit_Button":
      return <EditButton />;
    case "Hamburger":
      return <Hamburger />;
    case "Icon_Clean":
      return <IconClean />;
    case "Icon_Event":
      return <IconEvent />;
    case "Icon_Finance":
      return <IconFinance />;
    case "Icon_Food":
      return <IconFood />;
    case "Icon_Home":
      return <IconHome />;
    case "Like_Button":
      return <LikeButton />;
    case "Lock_Close":
      return <LockClose />;
    case "Lock_Open":
      return <LockOpen />;
    case "Logo_Main":
      return <LogoMain />;
    case "Person_Add":
      return <PersonAdd />;
    case "Person":
      return <Person />;
    case "Plus_Button":
      return <PlusButton />;
    case "Settings":
      return <Settings />;
  }
};

export default Icon;
