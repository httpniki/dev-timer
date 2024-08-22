export default class WindowConfig {
   private $renderTasksButton = document.getElementById('render-tasks-button') as HTMLButtonElement
   private baseWindowSize = {
      width: window.innerWidth,
      height: window.innerHeight
   }
   isRendered = false

   constructor() {
      this.$renderTasksButton.addEventListener('click', () => {
         if (!this.isRendered) return this.render(true)
         if (this.isRendered) return this.render(false)
      })
   }

   private render(render: boolean) {
      const $tasksSection = document.getElementById('tasks-section') as HTMLTableSectionElement
      const $renderSectionButtonSpan = this.$renderTasksButton.querySelector('span') as HTMLSpanElement

      if (render) {
         this.isRendered = true
         $tasksSection.style.display = 'flex'
         window.resizeTo(window.innerWidth, window.innerHeight + 180)
         $renderSectionButtonSpan.textContent = 'Close tasks'
      }

      if (!render) {
         this.isRendered = false
         $tasksSection.style.display = 'none'
         window.resizeTo(this.baseWindowSize.width, this.baseWindowSize.height)
         $renderSectionButtonSpan.textContent = 'Open tasks'
      }
   }
}
