import { Component, OnInit } from '@angular/core'
import { ICurrentWeather } from 'src/app/interfaces'
import { WeatherService } from 'src/app/weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather = null
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getCurrentWeather('berlin', 'de').subscribe(data => {
      this.current = data
    })
    console.log(this.current)
  }
}
