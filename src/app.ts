import HTMLElements from "./components/html-elements.js"
import Settings from "./components/settings.js"

type TimerType = 'focus' | 'break'
interface Time {
   minutes: number
   seconds: number
}

type OnRun = (
   time: Time,
   { isFocusTime, isBreakTime }: { isFocusTime: boolean, isBreakTime: boolean }
) => void

class App extends HTMLElements {
   private settings = new Settings()
   private timer: NodeJS.Timeout | null = null
   private time: Time = {
      minutes: 45,
      seconds: 0
   }
   private timerType: TimerType = 'focus'

   constructor() {
      super()
      this.time.minutes = this.settings.focusTime
   }

   public init() {
      this.$startTimerButton.addEventListener('click', () => {
         this.$resetTimerButton.style.visibility = 'visible'

         if (!this.timer) return this.startTimer((time, { isFocusTime, isBreakTime }) => {
            this.$startTimerButton.textContent = 'Stop'

            if (isFocusTime) this.$timerLegend.textContent = 'Time to focus!'
            if (isBreakTime) this.$timerLegend.textContent = 'Time to break!'

            this.$timerMinutes.textContent = (time.minutes.toString().length === 1)
               ? `0${time.minutes}`
               : time.minutes.toString()

            this.$timerSeconds.textContent = (time.seconds.toString().length === 1)
               ? `0${time.seconds}`
               : time.seconds.toString()
         })

         if (this.timer) return this.clearTimer()
      })

      this.$resetTimerButton.addEventListener('click', () => this.clearTimer({ reset: true }))
   }

   private startTimer(onRun: OnRun) {
      this.timer = setInterval(() => {
         const isEnd = (this.time.minutes === 0 && this.time.seconds === 0)
         const isFocusTime = this.timerType === 'focus'
         const isBreakTime = this.timerType === 'break'

         if (isEnd && isFocusTime) {
            this.timerType = 'break'
            this.time.minutes = this.settings.breakTime
            this.time.seconds = 0
         }

         if (isEnd && isBreakTime) {
            this.timerType = 'focus'
            this.time.minutes = this.settings.focusTime
            this.time.seconds = 0
         }

         if (this.time.seconds > 0) this.time.seconds -= 1

         if (this.time.minutes && this.time.seconds === 0) {
            this.time.minutes -= 0o1
            this.time.seconds = 59
         }

         onRun(this.time, { isFocusTime, isBreakTime })
      }, 1000)
   }

   private clearTimer(args?: { reset: boolean }) {
      const { reset = false } = args ?? {}

      if (this.timer) clearInterval(this.timer)
      this.timer = null
      this.$startTimerButton.textContent = 'Start'
      this.$timerLegend.textContent = ''

      if (reset) {
         this.$resetTimerButton.style.visibility = 'hidden'
         this.$timerMinutes.textContent = '00'
         this.$timerSeconds.textContent = '00'
         this.timerType = 'focus'
         this.time = {
            minutes: this.settings.focusTime,
            seconds: 0
         }
      }
   }
}

new App().init()
