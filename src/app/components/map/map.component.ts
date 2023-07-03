import * as L from 'leaflet';


import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  order?: Order;
  latitude?: number;
  longitude?: number;
  private map!: L.Map;
  private centroid: L.LatLngExpression = [0, 0];

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    const markerOptions: L.MarkerOptions = {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'assets/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      }),
    };

    const marker = L.marker(this.centroid, markerOptions);
    marker.addTo(this.map);

    tiles.addTo(this.map);
  }

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.handleProductDetails();
  }

  handleProductDetails() {
    const theOrderTrackingCode: string = this.route.snapshot.paramMap.get('trackingCode')!;
    this.orderService.getOrderByTrackingCode(theOrderTrackingCode).subscribe((data) => {
      this.order = data;
      this.latitude = this.order?.orderSamples?.[this.order?.orderSamples!.length - 1]?.geoPosition?.latitude;
      this.longitude = this.order?.orderSamples?.[this.order?.orderSamples!.length - 1]?.geoPosition?.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      if (this.latitude !== undefined && this.longitude !== undefined) {
        this.centroid = [this.latitude, this.longitude];
        this.initMap();
      }
    });
  }
}
