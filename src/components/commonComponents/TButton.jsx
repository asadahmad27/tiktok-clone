// hover:opacity-80 transition duration-150 ease-in-out
import { collapse } from "@growthops/ext-ts";
import React, { useMemo } from "react";

const baseClass =
  "relative rounded-lg justify-center items-center gap-2.5 inline-flex text-base font-medium disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-300";
const variantClasses = {
  primary: `bg-primary-blue-100 text-white`,
  secondary: `bg-primary-blue text-white`,
  outlined: "border border-secondary-purple-100 text-secondary-purple-100",
  secondaryLight:
    "bg-primary-blue-600 text-primary-gray-1500 hover:bg-secondary-purple-100 hover:text-white  !transition !ease-in-out !duration-500",
  purple: "bg-secondary-purple-300 text-white",
  red: "bg-secondary-red-100 text-white",
  gradient_v1: "bg-sky-50 bg-custom-gradient !rounded-none !border-none",
};

const sizeClasses = {
  large: "px-8 py-5 heading-four space-x-4",
  regular: "px-6 py-3.5 heading-six space-x-3", //54
  middle: "px-5 py-[11.5px] heading-six space-x-3", //48px
  medium: "px-6 py-[9px] heading-six space-x-3", //44px
  small: "px-4 py-1 text-small space-x-2 !text-[11px]",
};

const useClasses = (variant, size, className) =>
  useMemo(
    () => ({
      root: collapse([
        baseClass,
        variantClasses[variant],
        sizeClasses[size],
        className ?? "",
      ]),
    }),
    [variant, className]
  );

const TButton = ({
  variant = "primary",
  size = "regular",
  className,
  label,
  children,
  icon,
  ...intrinsicButtonProps
}) => {
  const classes = useClasses(variant, size, className);

  return (
    <button
      className={`${classes.root} ${icon && "pl-[2.8rem]"}`}
      {...intrinsicButtonProps}
    >
      {icon && <span className="absolute left-[5%]">{icon}</span>}
      {label} {children && children}
    </button>
  );
};

export default TButton;
