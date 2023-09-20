import { settings } from './settings.ts'
import { startNotifyHour } from './time.ts'

export type Task = {
  text: string
  notify_hour: number
  message_id?: number
}

export const tasks: Task[] = settings.tasks.map(text => ({
  text,
  notify_hour: startNotifyHour
}))
