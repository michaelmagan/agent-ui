import React from "react"
import Link from "next/link"
import { HydraButton as HydraButtonType } from "@/model/hydra"

import { Button } from "@/components/ui/button"

export const HydraButton: React.FC<HydraButtonType> = ({
  text,
  href,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild
      {...props}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </Link>
    </Button>
  )
}
