import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'listaDoctores'
})
export class ListaDoctoresPipe{

  constructor(private sanitizer: DomSanitizer){}

  transform(html: string): unknown {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

}

