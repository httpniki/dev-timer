import { $$templateElement } from "../../lib/utils.js"
import type { Task as TaskType } from "@/types/task"

interface TaskArguments {
   id?: TaskType['id']
   content?: TaskType['content']
   createAt?: TaskType['createAt']
}

interface HTMLTaskElements {
   task: HTMLLIElement,
   taskContent: HTMLParagraphElement,
   deleteButton: HTMLButtonElement
}

export default class Task {
   private $Tasks = document.getElementById('tasks') as HTMLUListElement
   HTMLTaskElements!: HTMLTaskElements
   onDeleteTask!: (taskID: TaskType['id']) => void
   body: TaskType = {
      content: '',
      id: 0,
      createAt: ''
   }

   constructor(args?: TaskArguments) {
      if (args?.id) this.body.id = args.id
      if (args?.content) this.body.content = args.content
      if (args?.createAt) this.body.createAt = args.createAt

      const $task = $$templateElement('.task') as HTMLLIElement
      const $taskContent = $task.querySelector('p') as HTMLParagraphElement
      const $deleteButton = $task.querySelector('button') as HTMLButtonElement

      this.HTMLTaskElements = {
         task: $task,
         deleteButton: $deleteButton,
         taskContent: $taskContent
      }
   }

   create(args?: TaskArguments) {
      if (args?.content) this.body.content = args.content
      if (args?.id) this.body.id = args.id
      if (args?.createAt) this.body.createAt = args.createAt

      if (!this.body.content) throw new Error('Content is not provided')
      if (!this.body.id) this.body.id = Math.floor(Math.random() * (999999999999999 - 0) + 0)
      if (!this.body.createAt) this.body.createAt = new Date().toLocaleString()

      const { task, taskContent, deleteButton } = this.HTMLTaskElements

      const newTask: TaskType = {
         id: this.body.id,
         content: this.body.content,
         createAt: this.body.createAt
      }

      taskContent.textContent = newTask.content
      deleteButton.setAttribute('data-id', `${newTask.id}`)

      deleteButton.addEventListener('click', () => {
         const taskID = Number(deleteButton.getAttribute('data-id'))
         this.$Tasks.removeChild(this.HTMLTaskElements.task)

         if (this.onDeleteTask) this.onDeleteTask(taskID)
      })

      this.$Tasks.insertAdjacentElement('afterbegin', task)

      return {
         $element: task,
         body: newTask
      }
   }
}
