import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MyApiService } from '../services/API/my-api.service';
import { switchMap } from 'rxjs/operators';
import { PARAMETERS } from '../../../node_modules/@angular/core/src/util/decorators';

@Component({
  selector: 'app-tips-details',
  templateUrl: './tips-details.component.html',
  styleUrls: ['./tips-details.component.css']
})
export class TipsDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myapiService: MyApiService,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    let idNum=Number(id)
    const req=this.myapiService.getTipsDetails(idNum)
    req.subscribe( resp => {
      const tipsDetails = resp.body['data'];
      console.log(tipsDetails)
    }
    )
  }

}
