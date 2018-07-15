import { Component, OnInit } from '@angular/core'
import { ICurrentWeather } from 'src/app/interfaces'
import { WeatherService } from 'src/app/weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather
  constructor(private weatherService: WeatherService) {
    this.current = {
      city: 'Bethesda',
      country: 'US',
      date: new Date(),
      image: 'assets/img/sunny.jpeg',
      temperature: 72,
      description: 'sunny',
    } as ICurrentWeather
  }

  ngOnInit() {
    this.weatherService.getCurrentWeather('washington', 'us').subscribe(data => {
      this.current = data
    })
    console.log(this.current)
  }
}
