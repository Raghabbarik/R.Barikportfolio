'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isMobile: boolean;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  mouseY,
  spring,
  distance,
  magnification,
  baseItemSize,
  isMobile
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mousePos = useTransform(() => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    if (isMobile) {
      return mouseX.get() - rect.x - rect.width / 2;
    }
    return mouseY.get() - rect.y - rect.height / 2;
  });

  const targetSize = useTransform(mousePos, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex cursor-pointer items-center justify-center rounded-full bg-primary border-border/20 border-2 shadow-lg cursor-target ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  isMobile: boolean;
};

function DockLabel({ children, className = '', isHovered, isMobile }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const yOffset = isMobile ? -10 : 10;
  const positionClasses = isMobile ? 'bottom-full left-1/2 mb-2' : '-bottom-6 left-1/2';


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: yOffset }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute ${positionClasses} w-fit whitespace-pre rounded-md border border-border/50 bg-card px-2 py-0.5 text-xs text-foreground`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center text-primary-foreground ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 80,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };
  
  const mobileContainerClasses = "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-end";
  const desktopContainerClasses = "fixed top-4 right-4 z-50 flex flex-col items-end";

  const mobileDockClasses = "flex items-end gap-4 rounded-2xl border-border/20 border-2 bg-card/80 backdrop-blur-md p-2 shadow-2xl";
  const desktopDockClasses = "flex flex-col items-end gap-4 rounded-2xl border-border/20 border-2 bg-card/80 backdrop-blur-md p-2 shadow-2xl";

  return (
    <div className={isMobile ? mobileContainerClasses : desktopContainerClasses}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} ${isMobile ? mobileDockClasses : desktopDockClasses}`}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            isMobile={isMobile}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel isMobile={isMobile}>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}
