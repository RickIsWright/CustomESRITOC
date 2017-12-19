import { Component, AfterViewInit, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-custom-slider',
  template: `
  <div style="width:130px;" id="divSlider"></div>
  `
})
export class CustomSliderComponent implements AfterViewInit {
    private _layer;
  @Input() set layer(value: any){
      this._layer = value;
      if (this._layer) {
        this.value = this._layer.opacity || 1;
        jQuery(this._elementRef.nativeElement).find('#divSlider').slider({
            range: false,
            orientation: 'horizontal',
            min: 0,
            max: 1,
            step: .05,
            value: this.value,
            slide: (event, ui) => {
                if (this._layer && this._layer.setOpacity) {
                    this._layer.setOpacity(ui.value);
                }else {
                    this.value = ui.value;
                }
            }
        });
      }else {
        jQuery(this._elementRef.nativeElement).find('#divSlider').visible = false;
      }
  }
  get layer(){
      return this._layer;
  }
  _value: any = '';
  constructor(private _elementRef: ElementRef) { }

  ngAfterViewInit() {
  }

  get value(): any { return this._value; }
  set value(v: any) {
      if (v !== this._value) {
          this._value = v;
          this.onChange(v);
      }
  }

  writeValue(value: any) {
      this._value = value;
      this.onChange(value);
  }

  onChange = (_) => { };
  onTouched = () => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
