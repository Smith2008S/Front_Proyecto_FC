import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, Validators, FormControlDirective, FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
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
    
    });
  }



  
  async nlu_text(){
    let searchquery = this.tweetsform.value;
    var text = this.tweetsform.value.formData;
    

    var texto_1= {"text" : text}
    this.http.post('http://localhost:3000/api/upload-text', texto_1).subscribe(res =>{
      this.respuesta.push(res.json())
      console.log(this.respuesta)
      this.Process_ba()
      this.text.push(text);
      console.log(this.text);
    })
  }




  Process_ba(){
    this.isCollapsed = !this.isCollapsed;
  }

}
