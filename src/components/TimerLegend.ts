export default class TimerLegend {
   $element = document.getElementById('timer-legend') as HTMLParagraphElement

   setText() {
      const setBreakTitle = () => {
         this.$element.textContent = 'Time to break!'
      }

      const setFocusTitle = () => {
         this.$element.textContent = 'Time to focus!'
      }

      const clearTitle = () => {
         this.$element.textContent = ''
      }

      return {
         break: setBreakTitle,
         focus: setFocusTitle,
         none: clearTitle
      }
   }
}
