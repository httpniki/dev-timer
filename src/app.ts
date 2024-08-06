import HTMLElements from "./components/html-elements.js"
import Settings from "./components/settings.js"
import StartTimerButton from "./components/StartTimerButton.js"
import TimerLegend from "./components/timer-legend.js"
import VisualTimer from "./components/visual-timer.js"

type TimerType = 'focus' | 'break'
interface Time {
   minutes: number
   seconds: number
}

type OnRun = (
   time: Time,
   { isFocusTime, isBreakTime }: { isFocusTime: boolean, isBreakTime: boolean }
) => void

class App {
   private settings = new Settings()

   private $resetTimerButton = document.getElementById('reset-timer-button') as HTMLButtonElement
   private timerLegend = new TimerLegend()
   private visualTimer = new VisualTimer()
   private startButton = new StartTimerButton()

   private interval: NodeJS.Timeout | null = null
   private timerType: TimerType = 'focus'
   private time: Time = {
      minutes: 45,
      seconds: 0
   }

   constructor() {
      this.time.minutes = this.settings.focusTime
   }

   public init() {
      this.startButton.onClick(() => {
         this.$resetTimerButton.style.visibility = 'visible'
         this.startButton.press()

         if (!this.interval) return this.startTimer((time, { isFocusTime, isBreakTime }) => {
            if (isFocusTime) this.timerLegend.setText().focus()
            if (isBreakTime) this.timerLegend.setText().break()


            this.visualTimer.setTime({ minutes: time.minutes, seconds: time.seconds })
         })

         if (this.interval) return this.clearTimer()
      })

      this.$resetTimerButton.addEventListener('click', () => this.clearTimer({ reset: true }))
   }

   private startTimer(onRun: OnRun) {
      this.interval = setInterval(() => {
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

      if (this.interval) clearInterval(this.interval)
      this.interval = null
      this.startButton.unpress()
      this.timerLegend.setText().none()

      if (reset) {
         this.$resetTimerButton.style.visibility = 'hidden'
         this.visualTimer.setTime({ minutes: 0o0, seconds: 0o0 })
         this.timerType = 'focus'
         this.time = {
            minutes: this.settings.focusTime,
            seconds: 0
         }
      }
   }
}

new App().init()
