'use client';

import React from "react";
import {cn} from "@/lib/utils";

interface NewDocButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

const NewDocButton = ({className, disabled, ...props}: NewDocButtonProps) => {
  const isLoading = false;

  return (
    <button className={cn('bg-red-500', {'cursor-not-allowed': isLoading}, className)} {...props}>
      Cool button
    </button>
  )
}

export default function ReusableComponents() {
  return (
    <div className="flex flex-col	h-screen w-screen items-center justify-center bg-gray-500">
      <h1 className="text-white text-4xl font-mono mb-10">Reusable components</h1>
      <NewDocButton/>
      <div className="p-1"></div>
      <NewDocButton className="text-lg text-indigo-500"/>
    </div>
  )
}
