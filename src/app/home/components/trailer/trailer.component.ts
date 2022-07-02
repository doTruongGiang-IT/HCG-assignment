import { NzMessageService } from 'ng-zorro-antd/message';
import { CarouselConstants } from './../../../core/constants/carousel.constant';
import { Component, OnInit } from '@angular/core';
import { YOUTUBE } from 'src/app/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {
  customOptions = CarouselConstants.STORIES_CAROUSEL_OPTIONS;
  videos = [
    'https://youtu.be/D0zYJ1RQ-fs',
    'https://youtu.be/1roy4o4tqQM',
    'https://youtu.be/bILE5BEyhdo',
    'https://youtu.be/uBYORdr_TY8',
  ];
  videosParse: string[] = [];
  youtubeUrl = YOUTUBE.URL;
  youtubeUrlKeyLength = 11;


  constructor(
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.videos.map(video => {
      this.youtubeParser(video);
    });
  }

  youtubeParser(url: string): void {
    const youtubeUrlKeyIndex = 7;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const youtubeUrlComponents = url.match(regExp);

    // youtubeUrlComponents will return an array of item (component of youtube url). Key of youtube url store in index 7 of this array
    if (youtubeUrlComponents) {
      const youtubeUrlKey = youtubeUrlComponents[youtubeUrlKeyIndex];
      if (youtubeUrlComponents && youtubeUrlKey.length === this.youtubeUrlKeyLength){
        this.videosParse.push(this.youtubeUrl + youtubeUrlKey);
      } else {
        this.message.error('Url incorrect');
      }
    }
  }

}
