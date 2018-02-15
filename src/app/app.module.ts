import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { WordCloudLayoutComponent } from './layouts/word-cloud-layout/word-cloud-layout.component';

import { NewsService } from './services/news/news.service';

@NgModule({
  declarations: [
    AppComponent,
    WordCloudComponent,
    WordCloudLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
