import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ContentChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';

@Component({
  selector: 'qot-multi-picker',
  templateUrl: './multi-picker.component.html',
  styleUrls: ['./multi-picker.component.scss']
})
export class MultiPickerComponent implements OnInit, OnDestroy {

  constructor() { }

  public inputCtrl = new FormControl();

  @ContentChild(TemplateRef) public selectedItemTmpl: TemplateRef<Element>;

  @Input()
  public commandsTemplate: TemplateRef<Element>;

  @Input()
  public selectedItems: Array<any>;

  @Input()
  public autocompleteSource: (pattern: string) => Observable<Array<any>>;

  @Input()
  public isAllItemsSelected: boolean;

  @Input()
  public allItemsSelectionDisabled: boolean;

  @Output()
  public itemRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public allItemsRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public itemSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  public allItemsSelected: EventEmitter<any> = new EventEmitter();

  @Input()
  public inputPlaceholder: string;

  @Input()
  public emptyListLabel: string;

  @Input()
  public disabled = false;

  @Input()
  public customMenuOnly = false;

  public isBusy = false;

  public filteredItems: Observable<any>;

  public searchPattern: string;

  public ngOnInit() {

    const debounceTimeMs = 200;
    this.filteredItems = this.inputCtrl.valueChanges.pipe(
      debounceTime(debounceTimeMs),
      tap(pattern => { this.searchPattern = pattern; }),
      switchMap(pattern => {
        this.isBusy = true;

        return this.autocompleteSource(pattern).pipe(tap(_ => {
          this.isBusy = false;
        }));
      }),
    );
  }

  public ngOnDestroy() {
  }

  public onSelected(event: MatAutocompleteSelectedEvent) {
    this.itemSelected.next(event.option.value);
    this.inputCtrl.setValue(null);
  }

  public removeItem(item: any) {
    this.itemRemoved.next(item);
  }

  public removeAll() {
    this.allItemsRemoved.next();
  }

  public selectAll() {
    this.allItemsSelected.next();
  }
}
