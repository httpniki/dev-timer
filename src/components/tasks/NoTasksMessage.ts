export default class NoTasksMessage {
   $HTMLElement = document.getElementById('no-tasks-message') as HTMLElement
   private className = 'no-tasks'

   show(render?: boolean) {
      const $Tasks = document.getElementById('tasks') as HTMLUListElement

      if (!render) {
         this.$HTMLElement.style.display = 'none'
         $Tasks.classList.remove(this.className)
      }

      if (render) {
         this.$HTMLElement.style.display = 'block'
         $Tasks.classList.add(this.className)
      }
   }
}
