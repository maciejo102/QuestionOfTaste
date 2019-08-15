import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  pure: true
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args: any) {

    if (!args) {
      return value;
    }

    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, (pat: string) => '<highlight>' + pat + '</highlight>');

    return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
  }
}
