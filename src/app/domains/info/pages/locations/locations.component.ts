import { afterNextRender, Component, Signal, signal } from '@angular/core';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html'
})
export default class LocationsComponent {
  origin = signal('');
  locations = signal<any[]>([]);

  constructor(private locationsService: LocationService){
    this.loadLocations();

    afterNextRender(async()=>{
      try {
        const origin = await this.locationsService.getCurrentPosition();
        this.loadLocations({ origin });
      } catch (error) {
        console.error('Error obteniendo la ubicación:', error);
      }
    })
  }

  async loadLocations(params = {}) {
    const data = await this.locationsService.getLocationPromise(params);
    this.locations.set(data);
  }


}
