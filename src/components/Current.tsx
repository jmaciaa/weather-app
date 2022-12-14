import { Weather } from "../types"
import { formatDate, formatTemp, getWeatherIconUrl } from "../utils"
import "./Current.css"
import { CurrentDetail } from "./CurrentDetail"

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

type Props = {
  currentWeather: Weather["current"]
  city: string
  timezoneOffset: number
}

export const Current = ({ currentWeather, city, timezoneOffset }: Props) => {
  const { dt, temp, wind_speed, humidity, clouds, weather } = currentWeather

  const details = [
    { name: "Wind", icon: "🌬️", value: `${wind_speed} m/s` },
    { name: "Humidity", icon: "💧", value: `${humidity}%` },
    { name: "Cloudiness", icon: "☁️", value: `${clouds}%` },
  ]

  return (
    <div className="current">
      <h2 className="place">{city}</h2>
      <h4 className="date">{formatDate(dt + timezoneOffset, dateOptions)}</h4>
      <div className="main">
        <div>
          <p className="main__temp">{formatTemp(temp)}</p>
          <h3 className="main__id">{weather[0].main}</h3>
          <p className="main__description">{weather[0].description}</p>
        </div>
        <img
          className="main__image"
          height={100}
          width={100}
          src={getWeatherIconUrl(weather[0].icon)}
          alt={`${weather[0].main}-icon`}
        />
      </div>
      <div className="details">
        {details.map((detail) => (
          <CurrentDetail key={detail.name} detail={detail} />
        ))}
      </div>
    </div>
  )
}
