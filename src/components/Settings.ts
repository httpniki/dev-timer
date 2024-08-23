interface Args {
   onOpen?: (event: MouseEvent) => void
   onClose?: (event: MouseEvent) => void
}

export default class Settings {
   private readonly $focusTimeInput = document.getElementById('focus-time-input') as HTMLInputElement
   private readonly $breakTimeInput = document.getElementById('break-time-input') as HTMLInputElement
   private readonly $autoStartFocusCheckbox = document.getElementById('autostart-focus-input')
   private readonly $autoStartBreakCheckbox = document.getElementById('autostart-break-input')
   focusTime = 45
   breakTime = 15
   isRendered = false
   autoStartFocus = true
   autoStartBreak = true
   onOpen!: Args['onOpen']
   onClose!: Args['onClose']

   constructor(args?: Args) {
      const { onOpen, onClose } = args ?? {}

      if (onOpen) this.onOpen = onOpen
      if (onClose) this.onClose = onClose
      this.setup()
   }

   private setup() {
      const $settingsModal = document.getElementById('settings') as HTMLDivElement
      const $openSettingsbutton = document.getElementById('settings-btn') as HTMLButtonElement
      const $closeSettingsButton = document.getElementById('close-settings-btn') as HTMLButtonElement

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

      this.$autoStartFocusCheckbox?.addEventListener('input', (event) => {
         const target = event.target as HTMLInputElement

         if (target.checked) this.autoStartFocus = true
         if (!target.checked) this.autoStartFocus = false
      })

      this.$autoStartBreakCheckbox?.addEventListener('input', (event) => {
         const target = event.target as HTMLInputElement

         if (target.checked) this.autoStartBreak = true
         if (!target.checked) this.autoStartBreak = false
      })
   }
}

