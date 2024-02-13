import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/service";
import { FormsModule } from "@angular/forms";
import { PaginatePipe } from "../../pipes/pagination.pipe";
import {NgForOf, NgIf} from "@angular/common";
import { Person } from "../../interfaces/person.interface";
import { PaginationComponent } from "../pagination/pagination.component";
import {TableColumn} from "../../interfaces/table.interface";
import {HideComponent} from "../hide/hide.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, PaginatePipe, NgForOf, PaginationComponent, NgIf, HideComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  people: Person[] = [];
  filteredData: Person[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  currentSortColumn: string | null = null;
  isSortAscending: boolean = true;
  pageSize: number = 10;
  columns: TableColumn[] = [
    { name: '_id', isVisible: true },
    { name: 'isActive', isVisible: true },
    { name: 'balance', isVisible: true },
    { name: 'picture', isVisible: true },
    { name: 'age', isVisible: true },
    { name: 'name', isVisible: true },
    { name: 'company', isVisible: true },
    { name: 'email', isVisible: true },
    { name: 'address', isVisible: true },
    { name: 'tags', isVisible: true },
    { name: 'favoriteFruit', isVisible: true },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
      this.people = res;
      this.filteredData = this.applyPagination(this.people);
    });
  }


  sortData(column: string): void {
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.currentSortColumn = column;
      this.isSortAscending = true;
    }

    this.people.sort((a, b) => {
      let aValue = (a as any)[column];
      let bValue = (b as any)[column];

      const keys = column.split('.');
      if (keys.length > 1) {
        aValue = keys.reduce((obj, key) => (obj as any)[key], a);
        bValue = keys.reduce((obj, key) => (obj as any)[key], b);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.isSortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.isSortAscending ? aValue - bValue : bValue - aValue;
      } else {
        if (aValue > bValue) return this.isSortAscending ? 1 : -1;
        if (aValue < bValue) return this.isSortAscending ? -1 : 1;
        return 0;
      }
    });

    this.filteredData = this.applyPagination(this.people);
  }

  filterData(): void {
    this.currentPage = 1;
    if (!this.searchQuery.trim()) {
      this.filteredData = this.applyPagination(this.people);
    } else {
      const searchTerm = this.searchQuery.toLowerCase().trim();
      this.filteredData = this.people.filter(person => {
        return Object.values(person).some(value =>
          value.toString().toLowerCase().includes(searchTerm)
        );
      });
    }
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.filteredData = this.applyPagination(this.people);
  }

  private applyPagination(data: Person[]): Person[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }

  toggleColumnVisibility(column: TableColumn) {
    column.isVisible = !column.isVisible;
  }
}
