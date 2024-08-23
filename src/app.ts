import Settings from "./components/Settings.js"
import StartTimerButton from "./components/StartTimerButton.js"
import TimerLegend from "./components/TimerLegend.js"
import VisualTimer from "./components/VisualTimer.js"
import Timer from "./lib/timer.js"

class App {
   private settings = new Settings()

   private $resetTimerButton = document.getElementById('reset-timer-button') as HTMLButtonElement
   private timerLegend = new TimerLegend()
   private visualTimer = new VisualTimer()
   private startButton = new StartTimerButton()
   private $nextStageButton = document.getElementById('next-stage-button') as HTMLButtonElement

   private timer = new Timer()
   private timerType: 'focus' | 'break' = 'focus'

   init() {
      this.visualTimer.setTime({ minutes: this.settings.focusTime, seconds: 0 })

      this.startButton.onClick(() => {
         const isUnPaused = this.timer.hasTimer && this.timer.isRunning
         const isPaused = this.timer.hasTimer && !this.timer.isRunning

         this.$resetTimerButton.style.visibility = 'visible'
         this.startButton.press({ sounds: true })

         if (!this.timer.hasTimer) {
            return this.timer.start({
               minutes: this.settings.focusTime,
               seconds: 0,
               onRun: () => {
                  if (this.timerType === 'focus') this.timerLegend.setText().focus()
                  if (this.timerType === 'break') this.timerLegend.setText().break()
                  this.$nextStageButton.style.visibility = 'visible'

                  this.visualTimer.setTime({
                     minutes: this.timer.time.minutes,
                     seconds: this.timer.time.seconds
                  })

                  this.settings.onOpen = () => {
                     this.startButton.unpress()
                     this.timer.pause()
                  }

                  this.settings.onClose = () => {
                     this.startButton.press()
                     this.timer.unPause()
                  }
               },
               onEnd: () => {
                  const notificationSound = new Audio('public/notification.mp3')
                  notificationSound.volume = 0.2
                  notificationSound.play()

                  if (this.timerType === 'focus') {
                     this.timerType = 'break'
                     this.timer.setTime(this.settings.breakTime, 0)

                     if (!this.settings.autoStartBreak) {
                        this.timer.pause()
                        this.startButton.unpress({ sounds: true })
                     }

                     return
                  }

                  if (this.timerType === 'break') {
                     this.timerType = 'focus'
                     this.timer.setTime(this.settings.focusTime, 0)

                     if (!this.settings.autoStartFocus) {
                        this.timer.pause()
                        this.startButton.unpress({ sounds: true })
                     }

                     return
                  }
               }
            })
         }

         if (isUnPaused) {
            this.startButton.unpress({ sounds: true })
            return this.timer.pause()
         }
         if (isPaused) {
            this.startButton.press({ sounds: true })
            return this.timer.unPause()
         }
      })

      this.$nextStageButton.addEventListener('click', () => {
         this.timer.stop()

         if (this.timerType === 'focus') {
            this.timerType = 'break'
            this.visualTimer.setTime({ minutes: this.settings.breakTime, seconds: 0 })
            this.timerLegend.setText().break()
            return this.timer.start({ minutes: this.settings.breakTime, seconds: 0 })
         }

         if (this.timerType === 'break') {
            this.timerType = 'focus'
            this.timerLegend.setText().focus()
            this.visualTimer.setTime({ minutes: this.settings.focusTime, seconds: 0 })
            return this.timer.start({ minutes: this.settings.focusTime, seconds: 0 })
         }
      })

      this.$resetTimerButton.addEventListener('click', () => {
         this.timer.stop()
         this.startButton.unpress()

         this.timerLegend.setText().none()
         this.visualTimer.setTime({ minutes: this.settings.focusTime, seconds: 0 })
         this.$resetTimerButton.style.visibility = 'hidden'
         this.$nextStageButton.style.visibility = 'hidden'

         this.timerType = 'focus'
         this.timer.setTime(this.settings.focusTime, 0)
      })
   }
}

new App().init()
