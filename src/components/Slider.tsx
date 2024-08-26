import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';


export interface DataProps {
  data: {
    time: Date[]
    weatherCode: Float32Array
    temperature2m?: Float32Array
    temperature2mMax?: Float32Array
    getWeatherType: (c: number) => string | undefined
  };
  isHourly: boolean
}


function armyTo12hTime(time: Date): string {

  let hours = time.getHours()

  const amPm = hours >= 12 ? ' PM' : ' AM';

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return hours + amPm

}

function getImageURL(weatherCode: number, weatherType: string | undefined, time?: string): string | undefined {


  if (weatherCode > 3) {

    return weatherType?.split(',')[2]
  }

  else if (weatherCode === 3) {
    return weatherType?.split(',')[3]
  }
  else {
    //day icons
    if (time) {
      if ((time.split(" ")[1] === "AM" && Number(time.split(" ")[0]) > 7 && Number(time.split(" ")[0]) < 12) || (time.split(" ")[1] === "PM" && Number(time.split(" ")[0]) < 8)) {

        return weatherType?.split(',')[3]
      }
      //night icons
      else {

        return weatherType?.split(',')[4]

      }
    }

    return weatherType?.split(',')[3]

  }

}

function getIndex(time: Date[]): number {
  const currentTime = new Date()

  const newTime = time.find((date) => {
    return (date.getHours() === currentTime.getHours()) && (currentTime.toLocaleDateString() === date.toLocaleDateString())

  })
  const index = time.indexOf(newTime as Date)

  return index
}
export function customRound(value: number) {
  // Determine if the value should be rounded up or down
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  // If the decimal part is less than 0.5, round towards zero
  if (absValue % 1 < 0.5) {
    return isNegative ? -Math.floor(absValue) : Math.floor(absValue);
  } else {
    // If the decimal part is 0.5 or more
    const roundedToNearestTen = Math.ceil(absValue);
    return isNegative ? -roundedToNearestTen : roundedToNearestTen;
  }
}

//data prop is either hourly obj or daily obj data
export default function Slider({ data, isHourly }: DataProps) {

  const content = isHourly ? (
    <div className="item-wrapper">
      {data.time.slice(getIndex(data.time), 35).map((time: Date, index: number) => (
        <SwiperSlide key={index}>
          <div className='time'>{armyTo12hTime(time)}</div>
          <div className='image-wrapper'>
            <img className='simage' src={require("../assests/Icons/" + getImageURL(data.weatherCode[index + getIndex(data.time)], data.getWeatherType(data.weatherCode[index + getIndex(data.time)]), armyTo12hTime(time)))} alt="" />
          </div>
          <div className='stemperature'>{customRound((data.temperature2m?.[index + getIndex(data.time)] as number)) + " °C"}</div>
        </SwiperSlide>

      ))}

    </div>
  ) : (
    <div className="item-wrapper">
      {data.time.slice(1).map((time: Date, index: number) => (
        <SwiperSlide key={index}>
          <div className='time' >{time.toLocaleDateString("en", { weekday: 'short' })}</div>
          <div className='image-wrapper'>
            <img className='simage' src={require("../assests/Icons/" + getImageURL(data.weatherCode[index], data.getWeatherType(data.weatherCode[index])))} alt="" />
          </div>
          <div className='stemperature'>{customRound(data.temperature2mMax?.[index] || 0) + " °C"}</div>
        </SwiperSlide>
      ))}
    </div>
  );

  return (
    <div className='slider-wrapper'>
      <Swiper

        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="slider"
      >
        {
          content
        }


      </Swiper>
    </div>
  )
}
