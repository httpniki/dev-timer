export default class Settings {
   private readonly $focusTimeInput = document.getElementById('focus-time-input')
   private readonly $breakTimeInput = document.getElementById('break-time-input')
   focusTime = 45
   breakTime = 15

   constructor() {
      this.setup()
   }

   private setup() {
      const $settingsModal = document.getElementById('settings-modal') as HTMLDivElement
      const $openSettingsbutton = document.getElementById('settings-btn') as HTMLButtonElement
      const $closeSettingsButton = document.getElementById('close-settings-button') as HTMLButtonElement

      $openSettingsbutton.addEventListener('click', () => {
         $settingsModal.style.visibility = 'visible'
      })

      $closeSettingsButton.addEventListener('click', () => {
         $settingsModal.style.visibility = 'hidden'
      })
   }
}
