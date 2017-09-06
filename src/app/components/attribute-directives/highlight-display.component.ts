import { Component, ElementRef }from '@angular/core';
import {HighlightDirective} from "./highlight.directive";

@Component({
    selector: 'show-highlight',
    template: `
        <div>
            <div>
                <input type="radio" name="colors" (click)="color='yellow'">yellow
                <input type="radio" name="colors" (click)="color='red'">red
                <input type="radio" name="colors" (click)="color='blue'">blue
            </div>
            <span myHighlight [highlightColor]="color" [defaultColor]="'black'">Highlight</span>
        </div>
    `,
    styles:['div{margin:28px auto;}']
})

export class HighlightDisplayComponent{
    color:string;
}