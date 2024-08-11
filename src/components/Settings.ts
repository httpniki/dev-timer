interface Args {
   onOpen?: (event: MouseEvent) => void
   onClose?: (event: MouseEvent) => void
}

export default class Settings {
   private readonly $focusTimeInput = document.getElementById('focus-time-input') as HTMLInputElement
   private readonly $breakTimeInput = document.getElementById('break-time-input') as HTMLInputElement
   focusTime = 45
   breakTime = 15
   isRendered = false
   onOpen!: Args['onOpen']
   onClose!: Args['onClose']

   constructor(args?: Args) {
      const { onOpen, onClose } = args ?? {}

      if (onOpen) this.onOpen = onOpen
      if (onClose) this.onClose = onClose
      this.setup()
   }

   private setup() {
      const $settingsModal = document.getElementById('settings-modal') as HTMLDivElement
      const $openSettingsbutton = document.getElementById('settings-btn') as HTMLButtonElement
      const $closeSettingsButton = document.getElementById('close-settings-button') as HTMLButtonElement

      $openSettingsbutton.addEventListener('click', (event) => {
         $settingsModal.style.visibility = 'visible'
         this.isRendered = true
         if (this.onOpen) this.onOpen(event)
      })

      $closeSettingsButton.addEventListener('click', (event) => {
         $settingsModal.style.visibility = 'hidden'
         this.isRendered = false

         if (this.onClose) this.onClose(event)
      })

      this.$focusTimeInput.addEventListener('input', (event) => {
         this.focusTime = Number((event.target as HTMLInputElement).value)
      })

      this.$breakTimeInput.addEventListener('input', (event) => {
         this.breakTime = Number((event.target as HTMLInputElement).value)
      })
   }
}

