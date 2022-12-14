export type SearchData = { value: [number, number]; label: string }

export type CurrentDetail = { name: string; icon: string; value: string }

export type Weather = {
  timezone_offset: number
  current: CurrentWeatherData
  daily: DailyWeatherData[]
  hourly: BaseWeatherData[]
}

type BaseWeatherData = {
  dt: number
  wind_speed: number
  humidity: number
  clouds: number
  weather: [{ id: number; main: string; description: string; icon: string }]
}

type CurrentWeatherData = BaseWeatherData & { temp: number }

type DailyWeatherData = BaseWeatherData & {
  temp: { day; min; max }
}
