"use client";

import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import * as React from "react";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2 p-2">
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          H
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="mb-2"> : </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          M
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  );
}
