export default class StartTimerButton {
   $element = document.getElementById('start-timer-button') as HTMLButtonElement

   public onClick(fn: (event: MouseEvent) => void) {
      this.$element.addEventListener('click', (event) => fn(event))
   }

   public press() {
      this.$element.classList.remove('unpress-button')
      this.$element.classList.add('press-button')
      this.$element.textContent = 'Stop'
   }

   public unpress() {
      this.$element.classList.remove('press-button')
      this.$element.classList.add('unpress-button')
      this.$element.textContent = 'Start'
   }
}
