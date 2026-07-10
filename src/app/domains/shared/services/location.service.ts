import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  async getLocationPromise(request: { origin?: string,  size?: number, radius?: number }): Promise<Location[]> {
    const url = new URL(`${environment.apiUrl}/api/v1/locations`);

    if (request.origin) {
      url.searchParams.set('origin', request.origin);
    }
    if (request.size) url.searchParams.set('size', request.size.toString());
    if (request.radius) url.searchParams.set('radius', request.radius.toString());

    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  }

   async getCurrentPosition(): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          resolve(coords);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
