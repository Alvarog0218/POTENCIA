import React, { useState, useEffect } from "react"

import { cn } from "@/lib/utils"

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
      {...props}>
      {!isMobile && Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)} />
        );
      })}

      {isMobile && (
        <>
          <defs>
            <pattern id={`grid-pattern-${width}-${height}`} width={width} height={height} patternUnits="userSpaceOnUse">
              <rect width={width} height={height} fill="none" className="stroke-gray-400/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-pattern-${width}-${height})`} />
        </>
      )}
    </svg>
  );
}
