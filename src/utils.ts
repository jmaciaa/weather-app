import { fetchPlaces } from "./api"
import { SearchData } from "./types"
import debounce from "debounce-promise"

export const formatDate = (
  unixTimestamp: number,
  optionsOverwrites?: Intl.DateTimeFormatOptions
) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    ...optionsOverwrites,
  }).format(new Date((unixTimestamp - 3600) * 1000))

export const formatTemp = (temp: number) => `${Math.round(temp)}°`

export const getWeatherIconUrl = (iconId: string) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`

export const getPlaces = debounce(
  async (inputValue: string): Promise<SearchData[]> => {
    if (!inputValue) return []
    const data = await fetchPlaces(inputValue)
    return data.map(({ lat, lon, name, state, country }) => {
      return {
        value: [lat, lon],
        label: buildCityLabel(name, state, country),
      }
    })
  },
  600
)

export const buildCityLabel = (
  city: string,
  region: string | undefined,
  country: string
) => `${city}, ${region ? `${region}, ` : ""}${country}`
