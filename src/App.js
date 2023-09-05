import React , {useState,useEffect} from 'react';

import axios from 'axios';


//import icons

import { IoIosSunny,IoMdRainy,IoMdCloudy,IoMdSnow,IoMdThunderstorm,IoMdSearch, IoMdSunny } from "react-icons/io";

import { BsCloudHaze2Fill,BsCloudDrizzleFill,BsEye,BsWater,BsThermometer,BsWind } from "react-icons/bs";

import { TbTemperature, TbTemperatureCelsius, TbThermometer } from "react-icons/tb";

import { ImSpinner8 } from "react-icons/im";

//api key

const API_KEY='6b2735d62e4bd14dd18c6e6c24d28b3e';

//fetch



const App = () => {
  const [data,setData]=useState(null)

  const [location,setLocation]=useState('Lima')

  const [inputValue,setInputValue]=useState("")

  const [loading,setLoading]=useState(false)

  const [errorMsg, setErrorMsg]=useState('')



  const handleInput=(event)=>{

    setInputValue(event.target.value)


  }

  console.log (inputValue)

  const handleSubmit=(event)=>{

    event.preventDefault()

    if (inputValue) {
      setLocation(inputValue)
    }

  }



//fetch data

useEffect(()=>{

  //set the loading 

  setLoading(true)

  async function fetchData() {

    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const response= await axios.get(url)

    setData(response.data)

    setLoading(false)

    } catch (error) {

      setLoading(false)
      setErrorMsg(error)

    }

  }

   fetchData()

   


},[location])

useEffect(()=>{

  const timer=setTimeout(()=>{
    setErrorMsg('')
  },2000)

  return ()=>clearTimeout(timer)

},[errorMsg])


console.log(data)

//if data is looader show the loader

if (!data) {
  return <div className='w-full h-screen flex justify-center bg-gradientBg bg-no-repeat bg-cover bg-center items-center'>
    
      <ImSpinner8 className='text-5xl animate-spin text-white'></ImSpinner8>
    
  </div>
}



//set the icon according to the weather

let icon;

switch (`Clear`) {
  case 'Clouds':
    icon=<IoMdCloudy></IoMdCloudy>
    break;
  
  case 'Haze':
    icon=<BsCloudHaze2Fill></BsCloudHaze2Fill>
    break;

  case 'Rain':
      icon=<IoMdRainy/>
      break;
  
  case 'Clear':
    icon=<IoMdSunny/>
    break;
  
  case 'Drizzle':
      icon=<BsCloudDrizzleFill/>
      break;
    
  case 'Snow':
      icon=<IoMdSnow/>
      break;
  
  case 'Thunderstorm':
        icon=<IoMdThunderstorm/>
        break;

  default:
    break;
}

//date object

const date=new Date()


  return <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
    {errorMsg &&  <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">
      {errorMsg.response.data.message}
</div>
 }
    <form className='h-12 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-4' onSubmit={handleSubmit}>
      <div className='h-full relative flex items-center justify-between p-2'>
        <input type='text' className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' placeholder='search by city or country' onInput={handleInput} >

        </input>

        <button type='submit' className='bg-teal-500 w-14 h-10 hover:bg-teal-600 rounded-full flex justify-center items-center transition'>
          <IoMdSearch className='text-white text-xl'></IoMdSearch>
        </button>
      </div>
    </form>
    <div className='w-full max-w-[450px] bg-black/20 min-h-[380px] text-white backdrop-blur-[32px]  rounded-[32px] py-12 px-6'>
        {loading?(<div className='w-full h-full flex justify-center items-center'>
                {console.log("spinner")}
              <ImSpinner8 className='text-5xl animate-spin text-white'></ImSpinner8>
                
        </div>):<div>
            <div className='flex items-center gap-x-5'>
              <div className='text-5xl'>{icon}</div>
              <div>
              <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
              <div>{date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}</div>
              </div>
            </div>
            <div className='my-12'>
              <div className='flex justify-center items-center'>
                { /** temp */ }
                <div className='text-[100px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                {/** celsius */}
                <div>

                  <TbTemperatureCelsius>

                  </TbTemperatureCelsius>

                </div>
              </div>
              {/** weather descripction */}

              <div className='capitalize text-center'>
                {data.weather[0].description}
              </div>

            </div>

            {/**card bottom */}

            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  
                  <BsEye></BsEye>
                  
                </div>
                
                <div>
                Visibility {' '} <span className='ml-2'>{data.visibility / 1000} km</span>
                </div>
              </div>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  
                  <BsThermometer></BsThermometer>
                  
                </div>
                
                <div className='flex'>
                  Feels like 
                 <div className=' flex ml-2'>{parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius></TbTemperatureCelsius>
                 </div>
                </div>
              </div>

              
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  
                  <BsWater></BsWater>
                  
                </div>
                
                <div>
                Huminidity <span className='ml-2'>{data.main.humidity} %</span>
                </div>
              </div>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  
                  <BsWind></BsWind>
                  
                </div>
                
                <div className='flex'>
                  Wind 
                 <div className=' flex ml-2'>{data.wind.speed} m/s
                  
                 </div>
                </div>
              </div>

              
            </div>
            </div>
            
        </div>}
      </div>
  </div>;
};

export default App;
