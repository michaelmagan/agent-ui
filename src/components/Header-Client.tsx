"use client"

import { FunctionComponent } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DarkModeToggle } from "./DarkModeToggle"

export const Header: FunctionComponent = () => {
  return (
    <section className="flex items-center justify-end space-x-4">
      <DarkModeToggle />
      <Dialog>
        <DialogTrigger>
          <Avatar>
            <AvatarImage src="https://media.licdn.com/dms/image/D4E03AQFdAFyUkPTA9Q/profile-displayphoto-shrink_100_100/0/1718213295390?e=1728518400&v=beta&t=0PuhLMlWmR4uoQwvNbTo_pypnypBM-YR7WmGHBlDwVY" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome, Michael Magán</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
