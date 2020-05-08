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
  text = [];
  texto = [];
  respuesta = []
  respuesta2 = []
  tweetsform: FormGroup;
  formData = new FormControl("");
  busq = new FormControl("");
  isCollapsed : boolean = true;
  isCollapsed2 : boolean = true;
  isCollapsed3 : boolean = true;

  constructor(private http: Http, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.tweetsform = this.formBuilder.group({
      formData: this.formData,
      busq: this.busq
    });
  }

  Process_ba(){
    this.isCollapsed = !this.isCollapsed;
  }
  Process_ba2(){
    this.isCollapsed2 = !this.isCollapsed2;
  }
  Process_ba3(){
    this.isCollapsed3 = !this.isCollapsed3;
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
  
  async searchcalldoc() {
    let searchquery = this.tweetsform.value.busq;
    var data={
      "bucket": "bolsa-valores",
      "name": searchquery
    }
    console.log(data);
    this.http.post('http://localhost:3000/list/' , data).subscribe(res => {
      this.text.push(res);
      console.log(res);
      this.Process_ba2();
    });
  }

  
  async nlu_text(){
    for(let texto of this.text ){
      var contenido = texto._body
    }
    var texto_1= {"text" : contenido}
    this.http.post('http://localhost:3000/api/upload-text', texto_1).subscribe(res =>{
      this.respuesta.push(res.json())
      console.log(this.respuesta)
      this.Process_ba3();
    })
  }

  async Analyze_text(){
    let searchquery = this.tweetsform.value.consulta_text;
    var texto_2= {"consulta_text": searchquery}
    console.log(texto_2);
    this.http.post('http://localhost:3000/api/upload-text', texto_2).subscribe(res =>{
      this.respuesta2.push(res)
      console.log(this.respuesta2)
    })
  }

}
