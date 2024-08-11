interface ArgumentTime {
   minutes?: number
   seconds?: number
}

interface StartArguments extends ArgumentTime {
   onRun?: () => void
   onEnd?: () => void
}

export default class Timer {
   private timer: NodeJS.Timeout | null = null
   isRunning = false
   hasTimer = false
   private onEnd: (() => void) | null = null
   private onRun: (() => void) | null = null
   time = {
      minutes: 0,
      seconds: 0
   }

   private interval() {
      return setInterval(() => {
         if (!this.isRunning) return

         let minutes = this.time.minutes
         let seconds = this.time.seconds

         const isEnd = (minutes === 0 && seconds === 0)

         if (isEnd && this.onEnd) return this.onEnd()
         if (isEnd && !this.onEnd) return

         if (seconds > 0) seconds -= 1

         if (minutes && seconds === 0) {
            minutes -= 1
            seconds = 59
         }

         this.time = { minutes, seconds }
         if (this.onRun) return this.onRun()
      }, 1000)
   }

   setTime(minutes: number | null, seconds: number | null) {
      if (Number(minutes)) this.time.minutes = minutes as number
      if (Number(seconds)) this.time.seconds = seconds as number
   }

   start({ minutes, seconds, onEnd, onRun }: StartArguments) {
      this.setTime(minutes ?? null, seconds ?? null)

      if (onEnd) this.onEnd = onEnd
      if (onRun) this.onRun = onRun

      this.isRunning = true
      this.timer = this.interval()
      this.hasTimer = true
   }

   pause() {
      this.isRunning = false
   }

   unPause() {
      this.isRunning = true
   }

   stop() {
      if (this.timer) clearInterval(this.timer)
      this.timer = null
      this.isRunning = false
      this.hasTimer = false
      this.time = { minutes: 0, seconds: 0 }
   }
}
