import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

interface DraggableCardBodyProps {
  className?: string;
  children?: React.ReactNode;
}

const DraggableCardBody: React.FC<DraggableCardBodyProps> = ({
  className,
  children,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";

        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: {
            type: "spring",
            ...springConfig,
          },
        });
        const currentVelocityX = velocityX.get();
        const currentVelocityY = velocityY.get();

        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY
        );
        const bounce = Math.min(0.8, velocityMagnitude / 1000);

        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });

        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-xl bg-neutral-600 p-6 shadow-2xl",
        className
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

interface DraggableCardContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const DraggableCardContainer: React.FC<DraggableCardContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("[perspective:3000px]", className)}>{children}</div>
  );
};

interface CommunityItem {
  title: string;
  image: string;
  members: string;
}

export default function DraggableCardDemo() {
  const communities: CommunityItem[] = [
    {
      title: "Marvel Universe",
      image:
        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80",
      members: "2.4M",
    },
    {
      title: "DC Comics",
      image:
        "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&q=80",
      members: "1.8M",
    },
    {
      title: "Manga Readers",
      image:
        "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&q=80",
      members: "3.2M",
    },
    {
      title: "Indie Comics",
      image:
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
      members: "890K",
    },
    {
      title: "Graphic Novels",
      image:
        "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=800&q=80",
      members: "1.2M",
    },
    {
      title: "Webcomics",
      image:
        "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80",
      members: "750K",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <DraggableCardContainer className="relative w-full max-w-7xl h-screen">
        <div className="absolute top-12 left-12 pointer-events-none z-0">
          <h1 className="text-7xl font-bold text-neutral-800">Communities</h1>
        </div>

        {communities.map((community, index) => {
          const positions = [
            "top-48 left-[8%] rotate-[-6deg]",
            "top-36 left-[32%] rotate-[4deg]",
            "top-40 right-[10%] rotate-[-3deg]",
            "bottom-52 left-[18%] rotate-[5deg]",
            "bottom-44 left-[45%] rotate-[-4deg]",
            "bottom-48 right-[15%] rotate-[3deg]",
          ];

          return (
            <DraggableCardBody
              key={community.title}
              className={`absolute ${positions[index]} bg-white/5 border border-white/10`}
            >
              <div className="relative">
                <img
                  src={community.image}
                  alt={community.title}
                  className="pointer-events-none w-full h-72 object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-medium text-neutral-100 mb-1">
                  {community.title}
                </h3>

                <p className="text-sm text-neutral-400">
                  {community.members} members
                </p>
              </div>
            </DraggableCardBody>
          );
        })}
      </DraggableCardContainer>
    </div>
  );
}
