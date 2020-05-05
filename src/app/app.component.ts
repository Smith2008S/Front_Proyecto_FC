import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, Validators, FormControlDirective, FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  tweetsdata = [];
  tweetsform: FormGroup;
  formData = new FormControl("");
  isCollapsed : boolean = true;

  constructor(private http: Http, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.tweetsform = this.formBuilder.group({
      formData: this.formData,
    });
  }

  Process_ba(){
    this.isCollapsed = !this.isCollapsed;
  }

  async searchcall() {
    let searchquery = this.tweetsform.value;
    console.log(this.tweetsform.value.formData);

    this.http.get('http://localhost:3000/api/tweets/' + this.tweetsform.value.formData).subscribe(res => {
      this.tweetsdata.push(res.json());
      console.log(this.tweetsdata);
      this.Process_ba();
    });
  }
  
}
