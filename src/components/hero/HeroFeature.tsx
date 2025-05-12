import React from "react";

interface HeroFeatureProps {
  icon: string;
  title: string;
  description: string;
}

export const HeroFeature: React.FC<HeroFeatureProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="max-w-full w-[352px] mt-8 first:mt-0">
      <div className="flex w-full flex-col items-stretch text-2xl text-white font-medium leading-none justify-center">
        <img src={icon} className="aspect-[1] object-contain w-8" alt={title} />
        <h3 className="mt-3">{title}</h3>
      </div>
      <p className="text-[#808080] text-base font-normal leading-6 mt-4">
        {description}
      </p>
    </div>
  );
};

export default HeroFeature;