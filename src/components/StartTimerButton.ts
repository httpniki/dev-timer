export default class StartTimerButton {
   $element = document.getElementById('start-timer-button') as HTMLButtonElement

   public onClick(fn: (event: MouseEvent) => void) {
      this.$element.addEventListener('click', (event) => fn(event))
   }
}
