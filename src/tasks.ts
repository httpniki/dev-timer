import type { Task as TaskType } from "@/types/task.js"
import CreateTaskInput from "./components/tasks/CreateTaskInput.js"
import Task from "./components/tasks/Task.js"
import TaskStorage from "./lib/tasks/TaskStorage.js"
import NoTasksMessage from "./components/tasks/NoTasksMessage.js"
import WindowConfig from "./components/tasks/WindowConfig.js"

interface CreateTaskArguments {
   id?: TaskType['id']
   content?: TaskType['content']
   createAt?: TaskType['createAt']
}

export default class Tasks extends WindowConfig {
   private createTaskInput = new CreateTaskInput()
   tasks: TaskType[] = []
   constructor() {
      super()
      this.init()
   }

   private init() {
      const tasks = new TaskStorage().fetchTasks()
      this.setTasks(tasks)

      tasks.map((el) => {
         if (!el) return
         this.createTask({ id: el.id, content: el.content })
      })

      this.createTaskInput.onCreateTask = (value) => {
         const taskBody = this.createTask({ content: value })
         this.setTasks((tasks) => [...tasks, taskBody])
      }
   }

   createTask({ content, id, createAt }: CreateTaskArguments) {
      const $task = new Task({ content, id, createAt })
      const task = $task.create()

      $task.onDeleteTask = (taskID) => {
         this.setTasks((tasks) => tasks.filter(el => el.id !== taskID))
      }

      return task.body
   }

   setTasks(tasks: TaskType[] | ((newValue: TaskType[]) => TaskType[])) {
      const noTasksMessage = new NoTasksMessage()
      const storage = new TaskStorage()

      const $tasks = document.getElementById('tasks') as HTMLUListElement

      let newValue: TaskType[] = []

      if (Array.isArray(tasks)) newValue = tasks
      if (!Array.isArray(tasks)) newValue = tasks(this.tasks)

      const sortedTasks = newValue.sort((a, b) => {
         const dateA = Date.parse(a.createAt)
         const dateB = Date.parse(b.createAt)

         return dateA - dateB
      })

      if (tasks.length > 0) noTasksMessage.show(false)
      if (tasks.length === 0) noTasksMessage.show(true)

      if (tasks.length < 3) $tasks.style.justifyContent = 'start'
      if (tasks.length >= 3) $tasks.style.justifyContent = 'space-around'

      this.tasks = sortedTasks
      storage.saveTasks(sortedTasks)
   }
}

new Tasks()
