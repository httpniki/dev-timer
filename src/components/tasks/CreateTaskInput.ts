import type { Task } from "@/types/task"

export default class CreateTaskInput {
   private $createTaskInput = document.querySelector('#new-task-input-wrapper input') as HTMLInputElement
   private $createTaskButton = document.querySelector('#new-task-input-wrapper button') as HTMLButtonElement
   private inputValue = ''
   onCreateTask!: (value: Task['content']) => void
   constructor() {
      this.setup()
   }

   private setup() {
      this.$createTaskInput.addEventListener('input', (event) => {
         const target = event.target as HTMLInputElement
         this.inputValue = this.inputValue = target.value
      })

      this.$createTaskButton.addEventListener('click', (event) => {
         event.preventDefault()

         if (!this.inputValue || !this.onCreateTask) return

         this.onCreateTask(this.inputValue)

         this.inputValue = ''
         this.$createTaskInput.value = ''
      })
   }
}
