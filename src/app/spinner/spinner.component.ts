import { Component, OnInit } from '@angular/core';
import {SpinnerService} from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinnerBool: boolean;

  constructor(private spinnerService: SpinnerService) {
    spinnerService.getSpinnerBool().subscribe(spinnerBool => {
        this.showSpinnerBool = spinnerBool;
      }
    );
  }

  ngOnInit() {
  }

}
