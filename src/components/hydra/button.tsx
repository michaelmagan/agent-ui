import React from "react"
import Link from "next/link"
import { HydraButton as HydraButtonType } from "@/model/hydra"
import { Button } from "@/components/ui/button"

type HydraButtonProps = HydraButtonType & {
  onClick?: () => void
}

export const HydraButton: React.FC<HydraButtonProps> = ({
  text,
  href,
  variant,
  size,
  className,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const ButtonContent = () => (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild
      {...props}
    >
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
          {text}
        </Link>
      ) : (
        <span onClick={onClick}>{text}</span>
      )}
    </Button>
  )

  return <ButtonContent />
}
