import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phonepipe/phone-pipe.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PhonePipe],
  exports: [PhonePipe]
})
export class SharedModule { }