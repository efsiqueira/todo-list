import React from "react"
import { cx } from "class-variance-authority"

export const MainContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"main">) => {
  return (
    <main className={cx("mt-4 md:mt-8", className)} {...props}>
      {children}
    </main>
  )
}