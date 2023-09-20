import { Telegraf } from 'npm:telegraf'
import { settings } from './src/settings.ts'
import { useButtonActions } from './src/actions/button.ts'
import { useStartAction } from './src/actions/start.ts'

console.log(settings)

const bot = new Telegraf(settings.token)

useStartAction(bot)
useButtonActions(bot)

bot.launch().then(() => console.log('Bot started!'))
