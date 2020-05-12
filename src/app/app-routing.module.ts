import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileComponent } from "./file/file.component";
import { TweetComponent } from "./tweet/tweet.component";
import { TextComponent } from "./text/text.component";

const routes: Routes = [
  { path: "", component: TweetComponent },
  { path: "tweet", component: TweetComponent },
  { path: "file", component: FileComponent },
  { path: "text", component: TextComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
