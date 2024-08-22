import type { Task } from "@/types/task"

export default class TaskStorage {
   private key = 'tasks'

   fetchTasks(): Task[] {
      let tasks: Task[] = []

      const storageValue = window.localStorage.getItem(this.key)
      if (storageValue) tasks = JSON.parse(storageValue)

      return tasks
   }

   saveTasks(tasks: Task[]) {
      const data = JSON.stringify(tasks)

      window.localStorage.setItem(this.key, data)
   }
}
