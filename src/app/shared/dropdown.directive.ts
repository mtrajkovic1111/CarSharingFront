import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
//   @HostBinding('class.show') isClicked = false;
//   @HostListener('click') toggleDropdown() {
//     this.isClicked = !this.isClicked;
//   }

// }
constructor(private _el: ElementRef) { }
        @HostBinding('class.show') isOpen = false;
        @HostListener('click') toogleOpen() {
            this.isOpen = !this.isOpen;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
        }

      }
