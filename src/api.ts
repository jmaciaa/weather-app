import { Weather } from "./types"

type City = {
  name: string
  lat: number
  lon: number
  state?: string
  country: string
}

const { VITE_WEATHER_URL, VITE_API_KEY, VITE_RAPID_API_KEY } = import.meta.env

export const fetchPlaces = async (inputValue: string): Promise<City[]> => {
  const url = `${VITE_WEATHER_URL}/geo/1.0/direct?q=${inputValue}&limit=20&appid=${VITE_API_KEY}`
  return (await fetchData(url)) as City[]
}

export const fetchWeatherData = async (lat: number, lon: number) => {
  const url = `${VITE_WEATHER_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${VITE_API_KEY}&units=metric`
  return (await fetchData(url)) as Weather
}

export const fetchCurrentLocation = async (lat: number, lon: number) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${lon}/nearbyCities?radius=10&limit=1&minPopulation=10000`

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  }

  const { data } = await fetchData(url, options)
  return data
}

const fetchData = async (...fetchParams: Parameters<typeof fetch>) => {
  const res = await fetch(...fetchParams)
  return res.json()
}
