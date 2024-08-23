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
   private stage: 'focus' | 'break' = 'focus'

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
                  const isFocusStageTextMismatch = this.timerLegend.currentText === this.timerLegend.stageText.focus
                  const isBreakStageTextMismatch = this.timerLegend.currentText === this.timerLegend.stageText.break

                  if (this.stage === 'focus' && !isFocusStageTextMismatch) this.timerLegend.setText().focus()
                  if (this.stage === 'break' && !isBreakStageTextMismatch) this.timerLegend.setText().break()
                  if (this.$nextStageButton.style.visibility !== 'visible') this.$nextStageButton.style.visibility = 'visible'

                  this.visualTimer.setTime(this.timer.time)

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

                  const newStage = (this.stage === 'focus') ? 'break' : 'focus'
                  const newTime = {
                     minutes: 0,
                     seconds: 0
                  }

                  if (newStage === 'focus') {
                     newTime.minutes = this.settings.focusTime

                     if (!this.settings.autoStartFocus) {
                        this.timer.pause()
                        this.startButton.unpress({ sounds: true })
                     }
                  }

                  if (newStage === 'break') {
                     newTime.minutes = this.settings.breakTime

                     if (!this.settings.autoStartBreak) {
                        this.timer.pause()
                        this.startButton.unpress({ sounds: true })
                     }
                  }

                  this.timer.setTime(newTime.minutes, newTime.seconds)
                  this.stage = newStage
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
         let newTime = { minutes: 0, seconds: 0 }
         let newStage: 'focus' | 'break' = 'focus'

         if (this.stage === 'focus') {
            newStage = 'break'
            newTime.minutes = this.settings.breakTime
         }

         if (this.stage === 'break') {
            newStage = 'focus'
            newTime.minutes = this.settings.focusTime
         }

         if (newStage === 'break') this.timerLegend.setText().break()
         if (newStage === 'focus') this.timerLegend.setText().focus()

         this.stage = newStage
         this.visualTimer.setTime(newTime)
         this.timer.start(newTime)
      })

      this.$resetTimerButton.addEventListener('click', () => {
         this.timer.stop()
         this.startButton.unpress()

         this.timerLegend.setText().none()
         this.visualTimer.setTime({ minutes: this.settings.focusTime, seconds: 0 })
         this.$resetTimerButton.style.visibility = 'hidden'
         this.$nextStageButton.style.visibility = 'hidden'

         this.stage = 'focus'
         this.timer.setTime(this.settings.focusTime, 0)
      })
   }
}

new App().init()
