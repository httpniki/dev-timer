import HTMLElements from "./components/html-elements.js"

type TimerType = 'focus' | 'break'
interface Time {
   minutes: number
   seconds: number
}

class App extends HTMLElements {
   private timer: NodeJS.Timeout | null = null
   private time: Time = {
      minutes: 45,
      seconds: 0
   }
   private timerType: TimerType = 'focus'

   constructor() {
      super()
   }

   public init() {
   }
}

new App().init()
