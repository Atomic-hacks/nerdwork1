import React, { useState } from "react";

const WobbleCard = ({
  children,
  containerClassName = "",
  className = "",
  imageSrc,
  imageAlt = "Card image",
  imageClassName = "",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={`w-full bg-gradient-to-br from-indigo-600 to-indigo-900 relative rounded-2xl overflow-hidden ${containerClassName}`}
    >
      <div
        className="relative h-full bg-gradient-to-b from-white/10 to-transparent sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        {/* Background Image */}
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`w-full h-full object-cover ${imageClassName}`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 to-indigo-900/80"></div>
          </div>
        )}

        <div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={`h-full relative z-10 px-6 py-8 ${className}`}
        >
          <Noise />
          {children}
        </div>
      </div>
    </div>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: "30%",
      }}
    ></div>
  );
};

// Bento Grid Demo
export default function BentoGridDemo() {
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
          Bento Grid Gallery
        </h1>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Large Card - Spans 2 columns and 2 rows */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 row-span-2"
            imageSrc="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
            imageAlt="Abstract gradient"
          >
            <div className="max-w-sm">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Featured Project
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Experience the power of modern design with our flagship
                solution. Built for scale, designed for impact.
              </p>
            </div>
          </WobbleCard>

          {/* Tall Card - Spans 2 rows */}
          <WobbleCard
            containerClassName="row-span-2"
            imageSrc="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800"
            imageAlt="Technology"
          >
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Innovation
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Pushing boundaries with cutting-edge technology and creative
              solutions.
            </p>
          </WobbleCard>

          {/* Regular Card */}
          <WobbleCard
            imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
            imageAlt="Analytics"
          >
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Analytics
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Data-driven insights for better decisions.
            </p>
          </WobbleCard>

          {/* Wide Card - Spans 2 columns */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2"
            imageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"
            imageAlt="Global reach"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Global Reach
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Connect with millions worldwide through our powerful platform.
              </p>
            </div>
          </WobbleCard>

          {/* Regular Card */}
          <WobbleCard
            imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800"
            imageAlt="Security"
          >
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Security First
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Enterprise-grade protection for your data.
            </p>
          </WobbleCard>

          {/* Regular Card */}
          <WobbleCard
            imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
            imageAlt="Performance"
          >
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Performance
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Lightning-fast speeds that keep you ahead.
            </p>
          </WobbleCard>

          {/* Tall Card */}
          <WobbleCard
            containerClassName="row-span-2"
            imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
            imageAlt="Collaboration"
          >
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Collaborate
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Work together seamlessly with teams across the globe.
            </p>
          </WobbleCard>

          {/* Regular Card */}
          <WobbleCard
            imageSrc="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800"
            imageAlt="Code quality"
          >
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Clean Code
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Beautiful, maintainable codebases.
            </p>
          </WobbleCard>
        </div>
      </div>
    </div>
  );
}
