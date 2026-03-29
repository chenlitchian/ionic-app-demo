import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel]
})
export class Tab2Page implements OnInit {
  @ViewChild('mapContainer', { read: ElementRef }) mapContainer!: ElementRef;
  private map: L.Map | null = null;
  private currentLayer: L.TileLayer | null = null;
  selectedMapStyle: string = 'standard';

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    // Wait for the view to be initialized before creating the map
    setTimeout(() => {
      if (this.mapContainer && this.mapContainer.nativeElement) {
        this.map = L.map(this.mapContainer.nativeElement).setView([1.3216502, 103.8582341], 15);

        // Add default tile 
        this.addTileLayer('standard');

        // Add a marker
        L.marker([1.3216502, 103.8582341])
          .addTo(this.map)
          .bindPopup('Singapore')
          .openPopup();

        // Invalidate size to ensure tiles render correctly
        this.map.invalidateSize();
      }
    }, 100);
  }

  onMapStyleChange(event: any) {
    this.selectedMapStyle = event.detail.value;
    this.addTileLayer(this.selectedMapStyle);
  }

  private addTileLayer(style: string) {
    if (!this.map) return;

    // Remove current layer if exists
    if (this.currentLayer) {
      this.map.removeLayer(this.currentLayer);
    }

    let tileLayer: L.TileLayer;

    switch (style) {
      case 'standard':
        tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        });
        break;
      case 'minimal':
        // CartoDB Positron - minimal, light style
        tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CARTO',
          maxZoom: 19
        });
        break;
      case 'dark':
        // CartoDB Voyager - detailed dark style
        tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors © CARTO',
          maxZoom: 19
        });
        break;
      case 'satellite':
        // Satellite view using USGS ortho imagery
        tileLayer = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSOrthoimagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'USGS',
          maxZoom: 16
        });
        break;
      default:
        tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        });
    }

    tileLayer.addTo(this.map);
    this.currentLayer = tileLayer;
  }

}
