import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const StopWatch = ({time, setTime}) => {
  const location = useLocation()

  useEffect(() => {
    const countTime = setInterval(() => setTime(time+1), 1000)
    return () => clearInterval(countTime)
  }, [time, setTime, location])

  const formatedTime = () => {
    if(time < 60 && time < 9 ) return `00:0${time}`
    if(time < 60 && time > 9 ) return `00:${time}`
    let min = Math.floor(time / 60)
    let sec = time % 60
    if(min < 10) min = "0" + min
    if(sec < 10) sec = "0" + sec
    return `${min}:${sec}`
  }

  return (
    <div className="font-medium text-lg tracking-wide text-slate-500">
      {formatedTime()}
    </div>
  )
}

export default StopWatch
