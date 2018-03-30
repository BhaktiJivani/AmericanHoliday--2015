
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable() 
export class Service {

  constructor(private http: Http) { }
  
  getData() {
    return this.http.get('https://holidayapi.com/v1/holidays/?key=5881fa35-80ba-45d9-bd54-b21c9bbb39b3&country=US&year=2015')
      .map(res => res.json());
  }
}

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
     transform(value: any, args?: any[]): any[] {

        if(value) {
        
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
     
        return dataArr;
        }
    }
}


@Component({
  selector: 'my-app',
  template: `

<div *ngFor="let d of data?.holidays | keys">
  <div *ngFor="let a of d">
    <table>
    <th>NAME</th>
    <th>Date</th>
    <th>Observed</th>
    <th>Public</th>
    <tr style="rowspan='1'">
    <td><a href="details()">{{a.name}}</a></td>
    <td>{{a.date}}</td>
    <td>{{a.observed}}</td>
    <td>{{a.public}}</td>
    <tr>
    </table>
  </div>
</div>

    
  `,
})
export class App {

  data: Object = {};
  
  constructor(private service: Service) {}
  
  ngOnInit() {
    this.service.getData() 
      .subscribe(data => {
        this.data = data;
      })
  }

}



@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [ App, KeysPipe],
  bootstrap: [ App ],
  providers: [ Service ]
})
export class AppModule {}