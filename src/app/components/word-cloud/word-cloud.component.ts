import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as cloud from '@lib/d3-cloud';

interface WordCloudWord {
  text: string;
  count: number;
  size?: number;
  x?: number;
  y?: number;
  rotate?: number;
}

const fill: any = d3.scaleOrdinal(d3.schemeCategory10);

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit, OnChanges {
  @Input() words: string[];
  @ViewChild('cloud', { read: ElementRef }) svg: ElementRef;
  svg$: d3.Selection<any, {}, null, undefined>;
  canvas$: d3.Selection<d3.BaseType, {}, null, undefined>;
  
  grouped: { [k: string]: number } = {};
  wordCloudWords: WordCloudWord[];
  fontSize: d3.ScaleLinear<number, number>;
  layout: any;
  
  constructor() {
    this.layout = cloud()
      .size([500, 500])
      .padding(5)
      .rotate(() => (Math.random() * 2) * 90)
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', this.draw.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    const words = changes.words.currentValue;
    if (!(words && words.length)) return;
    this.grouped = {};
    this.grouped = words.reduce((grouped, word) => {
      grouped[word] = (grouped[word] || 0) + 1;
      return grouped;
    }, this.grouped);
    this.wordCloudWords = Object.keys(this.grouped).map((word) => {
      return { text: word, count: this.grouped[word] };
    });
    const extent = d3.extent(this.wordCloudWords, (d) => d.count);
    this.fontSize = d3.scaleLinear()
      .domain(extent)
      .range([16, 100])
      this.wordCloudWords.forEach((d) => (d.size = this.fontSize(d.count)));
    // console.log('groups', this.grouped, this.wordCloudWords);
    this.layout.words(this.wordCloudWords);
    this.layout.start();
  }

  ngOnInit() {
    this.svg$ = d3.select(this.svg.nativeElement);
    this.canvas$ = this.svg$
    .append('g')
    this.layout.start();
  }

  draw(words) {
    console.log('words', words);
    const size = this.layout.size();
    this.canvas$
      .attr('transform', `translate(${size[0] / 2}, ${size[1] / 2})`)
    .selectAll('text')
      .data(words)
    .enter()
      .append('text')
      .style('font-size', (d: WordCloudWord) => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', (d, i) => fill(i))
      .attr('text-anchor', 'middle')
      .attr('transform', (d: WordCloudWord) => {
        return `translate(${d.x}, ${d.y})rotate(${d.rotate})`
      })
      .text((d: WordCloudWord) => d.text);
  }
}
