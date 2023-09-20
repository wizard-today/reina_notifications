import { Telegraf, Context } from 'npm:telegraf'
import { cron } from 'https://deno.land/x/deno_cron@v1.0.0/cron.ts'
import { Task, tasks } from '../tasks.ts'
import { hour } from '../time.ts'
import { safe } from '../promise.ts'

const notify = (ctx: Context, task: Task) => safe(async () => {
  const message = await ctx.sendMessage(task.text, {
    reply_markup: {
      inline_keyboard: [[
        { text: '✅', callback_data: 'done' },
        { text: '⏰', callback_data: 'repeat' }
      ]]
    }
  })

  task.message_id = message.message_id
  task.notify_hour = hour() + 1
})

let _ctx: Context

cron('0 * * * *', () => {
  if (!_ctx) {
    return
  }

  for (const task of tasks.filter(task => task.notify_hour === hour())) {
    notify(_ctx, task)
  }
})


export const useStartAction = (bot: Telegraf) => {
  bot.start(ctx => {
    _ctx = ctx
  
    for (const task of tasks) {
      notify(ctx, task)
    }
  })
}
