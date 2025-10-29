import React from "react";

const Button = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  buttonClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
  buttonClasses?: string;
}) => {
  return (
    <div>
      <button
        className={`w-full relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none lg:w-40 ${buttonClasses}`}
        onClick={handleClick}
        type="submit"
      >
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4B6BFF_0%,#6D4BFF_50%,#4B6BFF_100%)]"
        />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center gap-2 justify-center rounded-full bg-primary px-7 text-sm font-medium text-white backdrop-blur-3xl ${otherClasses}`}
        >
          {position === "left" && icon}
          {title}
          {position === "right" && icon}
        </span>
      </button>
    </div>
  );
};

export default Button;
