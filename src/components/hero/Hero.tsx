
import React from "react";
import { Link } from "react-router-dom";
import HeroFeature from "./HeroFeature";

const Hero: React.FC = () => {
  return (
    <section
      className="pt-[42px] pb-[184px] px-20 max-md:pb-[100px] max-md:px-5"
      aria-labelledby="hero-heading"
    >
      <div className="flex w-full flex-col items-stretch max-md:max-w-full">
        <header className="flex w-full items-center gap-[40px_100px] text-[28px] text-white font-normal whitespace-nowrap justify-between flex-wrap max-md:max-w-full">
          {/* Logo and name removed from here as it's now in the Header component */}
        </header>

        <div className="self-center flex gap-[138px] flex-wrap mt-[106px] max-md:max-w-full max-md:mt-10">
          <div className="flex min-w-60 flex-col items-stretch justify-center w-[695px] max-md:max-w-full">
            <div className="flex w-full flex-col items-stretch justify-center max-md:max-w-full">
              <h1
                id="hero-heading"
                className="text-white text-7xl font-semibold leading-[90px] tracking-[-1.44px] max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]"
              >
                Reflect with the <br />Future You
              </h1>
              <p className="text-[rgba(139,139,139,1)] text-base font-medium leading-6 mt-5 max-md:max-w-full">
                Uncover clarity, growth, and wisdom through thoughtful
                conversations with your future self. Your journal isn't just a
                record — it's a mirror across time.
              </p>
            </div>
            <Link to="/signup">
              <button
                className="bg-[rgba(65,105,225,1)] flex min-h-[46px] items-center gap-2 overflow-hidden text-base text-white font-normal justify-center mt-10 px-5 rounded-md"
                aria-label="Start Journaling"
              >
                <span className="self-stretch my-auto">Start Journaling</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b7694f438ce893e99344555ba65aac42a6ea81f?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                  alt="Arrow icon"
                />
              </button>
            </Link>
          </div>

          <div className="flex min-w-60 flex-col items-center w-[352px]">
            <HeroFeature
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/7c0dca827e2860c3453a2ed90fc8496c8ffa389d?placeholderIfAbsent=true"
              title="Talk to Your Future"
              description="Converse with future versions of yourself for deeper insight."
            />
            <HeroFeature
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/71df345c68d79fee3c9772ad489664f7eee30974?placeholderIfAbsent=true"
              title="Capture Moments"
              description="Save meaningful thoughts and entries in one place."
            />
            <HeroFeature
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/cd0d4d9d8e3dd771b0e96f67dd625505223abc93?placeholderIfAbsent=true"
              title="Track Your Growth"
              description="See how your mindset evolves over time."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
