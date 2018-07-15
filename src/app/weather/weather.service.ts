import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { ICurrentWeather } from '../interfaces'
import { map } from 'rxjs/operators'

//adee9aa51d834bbea36cea03c0d1255e

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpclient: HttpClient) {}

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToCelsius(data.main.temp),
      description: data.weather[0].description
    }
  }
private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67
}
  private convertKelvinToCelsius(kelvin: number) {
    return kelvin - 273.15  ;
  }
  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    let x = this.httpclient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
        `q=${city},${country}&appid=${environment.appId}`
    )
    console.log(x.pipe(map((data)=>this.transformToICurrentWeather(data))))
    return x.pipe(map((data)=>this.transformToICurrentWeather(data)));
  }
}


}

interface ICurrentWeatherData {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  id: number
  name: string
  cod: number
}

interface Sys {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}

interface Clouds {
  all: number
}

interface Wind {
  speed: number
  deg: number
}

interface Main {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Coord {
  lon: number
  lat: number
}
