import { CurrentDetail as CurrentDetailType } from "../types"
import "./CurrentDetail.css"

type Props = { detail: CurrentDetailType }

export const CurrentDetail = ({ detail }: Props) => {
  const { name, icon, value } = detail
  return (
    <div className="detail">
      <i>{icon}</i>
      <p className="detail__value">{value}</p>
      <p className="detail__name">{name}</p>
    </div>
  )
}
