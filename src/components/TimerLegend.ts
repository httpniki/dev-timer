export default class TimerLegend {
   $element = document.getElementById('timer-legend') as HTMLParagraphElement
   currentText = ''
   stageText = {
      break: 'Time to break!',
      focus: 'Time to focus!',
      clear: ''
   }

   setText() {
      const setBreakTitle = () => {
         const text = this.stageText.break
         this.$element.textContent = text
         this.currentText = text
      }

      const setFocusTitle = () => {
         const text = this.stageText.focus
         this.$element.textContent = text
         this.currentText = text
      }

      const clearTitle = () => {
         const text = this.stageText.clear
         this.$element.textContent = text
         this.currentText = text
      }

      return {
         break: setBreakTitle,
         focus: setFocusTitle,
         none: clearTitle
      }
   }
}
