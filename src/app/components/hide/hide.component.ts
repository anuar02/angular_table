import {Component, Input} from '@angular/core';
import {TableColumn} from "../../interfaces/table.interface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-hide',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './hide.component.html',
  styleUrl: './hide.component.scss'
})
export class HideComponent {
  @Input() ListItems: TableColumn[] = []
  public hide: boolean = false

  toggleItemVisibility(item: TableColumn) {
    item.isVisible = !item.isVisible;
  }

  toggleHide(){
    this.hide = !this.hide
  }

}
