import { OwlOptions } from 'ngx-owl-carousel-o';
import { CAROUSEL_ITEM_STORIES } from './enum.constant';

export class CarouselConstants {
  public static readonly STORIES_CAROUSEL_OPTIONS: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 150,
    margin: 10,
    slideBy: 3,
    navText: ['&lsaquo;', '&rsaquo;'],
    skip_validateItems: true,
    responsive: {
      300: { items: CAROUSEL_ITEM_STORIES.MOBILE },
      600: { items: CAROUSEL_ITEM_STORIES.TABLET },
      720: { items: CAROUSEL_ITEM_STORIES.DESKTOP },
    },
    nav: true
  };
}
