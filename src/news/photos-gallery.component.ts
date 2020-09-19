import { Component, Input } from '@angular/core';
import { Article } from 'src/news/article-model'
import { ArticleService } from 'src/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/services/common.service';
import { Image } from './news-model';

@Component({
  selector: 'photos-gallery',
  templateUrl: './photos-gallery.component.html',
})

export class PhotosGalleryComponent {
  imagesList: Image[] = [];
  imageUrls: string[] = [];

  constructor(
    private articleservice: ArticleService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }

  async ngOnInit() {
    const result = await this.articleservice.getImagesList().toPromise();
    this.imageUrls = result.split('\n');
    this.imageUrls.forEach(image => {
      this.imagesList.push({
        url: window.location.origin + '/' + image,
        name: image.replace(/^.*[\\\/]/, '')
      });
    });
  }

  copyToClipboard() {

  }

}