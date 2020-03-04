import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Startup Predictor!';
  profit = {
    'total': null
  }

  input = {
    'rd': '',
    'admin': '',
    'marketing': '',
    'state': ''
  }

  readonly ROOT_URL = 'http://173.193.99.193:31863/';

  posts: any;

  response: any;


  constructor(private http: HttpClient) {

  }

  data = {
    "rd": "100",
    "admin": "200",
    "marketing": "200",
    "state": "New York"
  };

  calculate() {
    console.log('Clicked');
    console.log(this.input);
    this.invokeAPI();
  }

  invokeAPI() {
    console.log("invoke");
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http.post(this.ROOT_URL, this.input, {headers: header}).subscribe(data => {
      console.log(data)
      this.response = data;

      this.profit.total = data['predictions'][0].values[0][0];
    });
  }

  getRD(event: any) {
    this.input.rd = event.target.value;
    console.log('name is ' + this.input.rd);
  }

  getAdministration(event: any) {
    this.input.admin = event.target.value;
  }

  getMarketing(event: any) {
    this.input.marketing = event.target.value;
  }

  getState(event: any) {
    this.input.state = event.target.value;
  }
}
