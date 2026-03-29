import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent], //ExploreContainerComponent
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  constructor() {}

  async ngOnInit() {
    const map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map')!,
      apiKey: environment.googleMapsApiKey,
      config: {
        center: {
          lat: 1.3216502,
          lng: 103.8582341
        },
        zoom: 15
      }
    });
  }

}
