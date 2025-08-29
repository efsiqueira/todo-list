import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"

export const iconVariants = cva("", {
  variants: {
    animate: {
      false: "",
      true: "animate-spin"
    }
  },
  defaultVariants: {
    animate: false
  }
})

interface IconProps extends React.ComponentProps<"svg">, VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<"svg">>
}

export const Icon = ({ svg: SvgComponent, animate, className, ...props }: IconProps) => {
  return <SvgComponent className={iconVariants({ animate, className })} {...props} />
}
