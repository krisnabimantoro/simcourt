"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BookOpen, Gavel, LayoutDashboard, LogIn, LogOut, User } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(( { className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        " flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        " relative flex h-[310px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-5 md:shadow-md",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10 z-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <User className="dark:text-black" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Image src="/logo.png" width={30} height={46.88} alt="Logo Laboratorium Hukum" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref} className="hover:cursor-pointer">
            <HoverCard openDelay={10}>
              <HoverCardTrigger>
                {" "}
                <LogIn className="dark:text-black" />
              </HoverCardTrigger>
              <HoverCardContent>Login atau Registrasi akun</HoverCardContent>
            </HoverCard>
          </Circle>

          <Circle ref={div2Ref} className="hover:cursor-pointer">
            <HoverCard openDelay={10}>
              <HoverCardTrigger>
                {" "}
                <LayoutDashboard className="dark:text-black" />
              </HoverCardTrigger>
              <HoverCardContent>
                Masuk ke menu dashboard dan <span className="font-bold">koordinator</span> akan menentukan anggota dan juga peran
              </HoverCardContent>
            </HoverCard>
          </Circle>
          <Circle ref={div3Ref} className="hover:cursor-pointer">
            <HoverCard openDelay={10}>
              <HoverCardTrigger>
                {" "}
                <Gavel className="dark:text-black" />
              </HoverCardTrigger>
              <HoverCardContent>Pilih persidangan di bagian sidebar</HoverCardContent>
            </HoverCard>
          </Circle>
          <Circle ref={div4Ref} className="hover:cursor-pointer">
            <HoverCard openDelay={10}>
              <HoverCardTrigger>
                {" "}
                <BookOpen className="dark:text-black" />
              </HoverCardTrigger>
              <HoverCardContent>Selesaikan persidangan sampai dapat putusan</HoverCardContent>
            </HoverCard>
          </Circle>
          <Circle ref={div5Ref} className="hover:cursor-pointer">
            <HoverCard openDelay={10}>
              <HoverCardTrigger>
                {" "}
                <LogOut className="dark:text-black" />
              </HoverCardTrigger>
              <HoverCardContent>Log-out atau keluar akun</HoverCardContent>
            </HoverCard>
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div4Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} duration={3} />
    </div>
  );
}
