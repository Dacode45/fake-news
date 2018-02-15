import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { memoize } from 'lodash';
import * as commonWords from 'common-words';

console.log(commonWords);

const isCommon = memoize((word) => {
  return !!commonWords.find((w) => w.word === word);
});

@Component({
  selector: 'app-word-cloud-layout',
  templateUrl: './word-cloud-layout.component.html',
  styleUrls: ['./word-cloud-layout.component.css']
})
export class WordCloudLayoutComponent implements OnInit {
  words = [];
  constructor(
    private newsService: NewsService
  ) {
    
  }

  ngOnInit() {
    this.newsService.articles$.subscribe((articles) => {
      if (articles.length === 0) return;
      const tokenized = articles.map((article) => {
        const words = article.text.match(/\w+/g);
        if (!words) return [];
        return words.filter((word) => {
          return !isCommon(word.toLowerCase());
        });
      });
      tokenized.sort((a, b) => b.length - a.length);
      console.log('tokenized', tokenized);
      this.words = tokenized[0];
    })
  }

}
