import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IArticle } from '@models/article.model';

@Injectable()
export class NewsService {
  articlesSource = new BehaviorSubject<IArticle[]>([]);
  articles$ = this.articlesSource.asObservable();
  constructor(private http: HttpClient) {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get('/assets/fake.csv', { responseType: 'text' })
      .subscribe((results) => {
        const data = d3.csvParse(results, (d) => {
          const toReturn: any = {
            ...d,
            published: new Date(d.published),
            crawled: new Date(d.crawled),
            ord_in_thread: +d.ord_in_thread,
            domain_rank: +d.domain_rank,
            spam_score: +d.spam_score,
            likes: +d.likes,
            comments: +d.comments,
            shares: +d.shares,
          }
          return toReturn;
        });
        this.articlesSource.next(data as IArticle[]);
      });
  }
}
