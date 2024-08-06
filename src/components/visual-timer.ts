interface Time {
   minutes?: number
   seconds?: number
}

export default class VisualTimer {
   $minutes = document.getElementById('timer-minutes') as HTMLParagraphElement
   $seconds = document.getElementById('timer-seconds') as HTMLParagraphElement

   public setTime({ minutes, seconds }: Time) {
      if (typeof minutes === 'number') {
         let minutesInString = minutes.toString()

         if (minutesInString.length === 1) minutesInString = `0${minutes}`

         this.$minutes.textContent = minutesInString
      }

      if (typeof seconds === 'number') {
         let secondsInString = seconds.toString()

         if (secondsInString.length === 1) secondsInString = `0${seconds}`

         this.$seconds.textContent = secondsInString
      }
   }
}
