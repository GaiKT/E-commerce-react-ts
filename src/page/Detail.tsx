import { useLocation } from "react-router-dom"
export default function Detail() {
  const location = useLocation()
  console.log(location)
  return (
    <div>Detail</div>
  )
}
