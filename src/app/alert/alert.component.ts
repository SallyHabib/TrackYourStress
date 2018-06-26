import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService) {
    alertService.getAlert().subscribe(newMessage => {
        this.message = newMessage;
      }
    );
  }

  removeAlert() {
    this.message = '';
  }

  ngOnInit() {
  }

}
