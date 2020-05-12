import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, Validators, FormControlDirective, FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';



export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})



export class TweetComponent implements OnInit {
  value = 'Clear me';
  tweetsdata = [];
  text = [];
  texto = [];
  respuesta = []
  respuesta2 = []
  tweetsform: FormGroup;
  formData = new FormControl("");
  busq = new FormControl("");
  isCollapsed : boolean = true;


  constructor(private http: Http, private formBuilder: FormBuilder) { }




  ngOnInit(): void {
    this.tweetsform = this.formBuilder.group({
      formData: this.formData,
      busq: this.busq
    });
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

  Process_ba(){
    this.isCollapsed = !this.isCollapsed;
  }
}


