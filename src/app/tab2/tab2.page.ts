import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab2Page implements OnInit {
  @ViewChild('mapContainer', { read: ElementRef }) mapContainer!: ElementRef;
  private map: L.Map | null = null;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    // Wait for the view to be initialized before creating the map
    setTimeout(() => {
      if (this.mapContainer && this.mapContainer.nativeElement) {
        this.map = L.map(this.mapContainer.nativeElement).setView([1.3216502, 103.8582341], 15);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(this.map);

        // Add a marker
        L.marker([1.3216502, 103.8582341])
          .addTo(this.map)
          .bindPopup('Singapore')
          .openPopup();
      }
    }, 100);
  }

}
