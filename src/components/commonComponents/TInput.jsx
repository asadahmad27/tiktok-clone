import React, { useState } from "react";
// import eyeHidden from "../../assets/icons/eye-hidden.svg";
import { collapse } from "@growthops/ext-ts";

const baseClass =
  "w-[90%] appearance-none focus:outline-none focus:shadow-outline border-0 !focus:border-0 bg-transparent text-sm placeholder-secondary-gray-1300 !disabled:cursor-move";
const inputRootBase =
  "relative border-[0.7px] rounded-lg border-gray-900 bg-gray-100 h-[48px] flex items-center px-4 font-['Poppins'] !disabled:cursor-move";

const TInput = ({
  label,
  className,
  type,
  inputRoot = "",
  inputClass = "",
  labelClass = "",
  LabelFrontIcon,
  endIcon,
  ...intrinsicProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleIconClick = (e) => {
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };
  const classes = {
    root: collapse([className ?? ""]),
    input: collapse([baseClass, inputClass]),
    inputRoot: collapse([inputRootBase, inputRoot, "!disabled:bg-gray-400"]),
    labelClass: collapse(["text-base leading-4", labelClass]),
  };
  return (
    <div className={classes.root}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <p className={classes.labelClass}>{label}</p>
          {LabelFrontIcon && LabelFrontIcon}
        </div>
      )}

      <div className={classes.inputRoot}>
        <input className={classes.input} {...intrinsicProps} type={type} />
        {endIcon && (
          <div className="absolute right-2 cursor-pointer">{endIcon}</div>
        )}

        {/* {type === "password" && (
          <div className="absolute right-2 cursor-pointer">
            {!showPassword ? (
              <img
                alt="eyeIcon"
                height={20}
                onClick={handleIconClick}
                // src={eyeHidden}
                width={20}
              />
            ) : (
              <img
                alt="eyeIcon"
                height={20}
                onClick={handleIconClick}
                src={eyeHidden}
                width={20}
              />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TInput;
