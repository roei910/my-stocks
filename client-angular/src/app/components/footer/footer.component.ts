import { Component } from '@angular/core';
import { ConnectivityService as ConnectivityService } from 'src/services/connectivity-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isConnected: boolean = false;

  constructor(private connectivityService: ConnectivityService){
    this.connectivityService.isConnected.subscribe(isConnected => this.isConnected = isConnected);
  }
}