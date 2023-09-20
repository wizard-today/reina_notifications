export type Settings = {
  token: string
  notifications: []
}

const loadSettings = (): Settings => {
  try {
    return JSON.parse(
      Deno.env.get('settings')
      ?? Deno.readTextFileSync('settings.json')
    )
  } catch {
    throw 'Settings not found'
  }
}

export const settings = loadSettings()
