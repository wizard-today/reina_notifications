import { Telegraf, Context } from 'npm:telegraf'
import { safe } from '../promise.ts'
import { tasks } from '../tasks.ts'
import { nextRepeatHour, startNotifyHour } from '../time.ts'

const deferNotification = (done: boolean) => (ctx: Context) => safe(() => {
  const message_id = ctx.callbackQuery!.message!.message_id

  safe(ctx.deleteMessage(message_id))

  const task = tasks.find(task => task.message_id === message_id)!

  if (done) {
    task.notify_hour = startNotifyHour
  } else {
    task.notify_hour = nextRepeatHour()
  }
  
  safe(ctx.answerCbQuery())
})

export const useButtonActions = (bot: Telegraf) => {
  bot.action('done', deferNotification(true))
  bot.action('repeat', deferNotification(false))
}
