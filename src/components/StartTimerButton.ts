interface PressArguments {
   sounds?: boolean
}

interface UnPressArguments {
   sounds?: boolean
}

export default class StartTimerButton {
   $element = document.getElementById('start-timer-button') as HTMLButtonElement

   public onClick(fn: (event: MouseEvent) => void) {
      this.$element.addEventListener('click', (event) => fn(event))
   }

   public press(args?: PressArguments) {
      if (args?.sounds) {
         const effectSound = new Audio('public/pick.mp3')
         effectSound.volume = 0.1
         effectSound.play()
      }
      this.$element.classList.remove('unpress-button')
      this.$element.classList.add('press-button')
      this.$element.textContent = 'Stop'
   }

   public unpress(args?: UnPressArguments) {
      if (args?.sounds) {
         const effectSound = new Audio('public/pick.mp3')
         effectSound.volume = 0.1
         effectSound.play()
      }
      this.$element.classList.remove('press-button')
      this.$element.classList.add('unpress-button')
      this.$element.textContent = 'Start'
   }
}
