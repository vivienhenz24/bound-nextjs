"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://calendly.com/vikrambhamre/meeting"
const SPEECH_DURATION = 3000 // milliseconds

export function Hero() {
  const [isSpeechVisible, setIsSpeechVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showSpeech = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsSpeechVisible(true)

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setIsSpeechVisible(false)
      timeoutRef.current = null
    }, SPEECH_DURATION)
  }
  return (
    <section className="px-6 pt-24 pb-4 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-7xl">
            Let your model do the{" "}
            <span
              onClick={showSpeech}
              className="underline decoration-2 underline-offset-4 cursor-pointer"
            >
              talking
            </span>
            .
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-normal tracking-tight md:text-xl lg:text-2xl">
            The simplest way to fine-tune speech models from just a few hours of audio while keeping
            full ownership of your model and data.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
        <div className="relative hidden md:flex items-center justify-center -translate-y-16">
          <img src="/logo-light.svg" alt="" className="h-[28rem] w-auto dark:hidden" />
          <img src="/logo-dark.svg" alt="" className="hidden h-[28rem] w-auto dark:block" />

          {isSpeechVisible && (
            <>
              {/* Eyes */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-16 -mt-8 animate-in fade-in zoom-in duration-300">
                <div className="h-6 w-6 rounded-full bg-foreground" />
                <div className="h-6 w-6 rounded-full bg-foreground" />
              </div>

              {/* Smile */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 animate-in fade-in zoom-in duration-300">
                <svg
                  width="80"
                  height="40"
                  viewBox="0 0 80 40"
                  className="fill-none stroke-foreground stroke-3"
                >
                  <path d="M 10 10 Q 40 40 70 10" />
                </svg>
              </div>

              {/* Speech bubble */}
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-32 animate-in slide-in-from-left duration-500">
                <div className="relative">
                  <div className="rounded-2xl border border-foreground bg-background px-6 py-4 text-base shadow-lg whitespace-nowrap">
                    You should join bound it&apos;s great!
                  </div>
                  {/* Speech bubble tail */}
                  <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 h-4 w-4 rotate-45 border-b border-l border-foreground bg-background" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
