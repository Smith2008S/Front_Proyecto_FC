import { Component } from '@angular/core';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  searchquery = '';
  tweetsdata;
  
  constructor(private http: Http){}
  
  makecall() {
    var headers = new Headers();
    
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    })
  }
  
  searchcall(){
    
    var headers = new Headers();
    var searchterm = 'query=' + this.searchquery;
    
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    this.http.get('http://localhost:3000/api/tweets/buscalgo', searchterm,).subscribe((res) => {
      this.tweetsdata = res.json().data.statuses;
    });
  }
  
  usercall(){
    var headers = new Headers();
    var searchterm = 'screenname=Yasmin_Payne1';
    
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    this.http.post('http://localhost:3000/user', searchterm, {headers: headers}).subscribe((res) => {
      console.log(res.json().data);
      
    });
  }

}
