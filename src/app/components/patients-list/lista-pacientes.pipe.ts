import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'listaPacientes'
})
export class ListaPacientesPipe{

  constructor(private sanitizer: DomSanitizer){}

  transform(html: string): unknown {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

}
