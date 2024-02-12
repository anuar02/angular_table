import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {data} from "../../assets/data";
import {Person} from "../interfaces/person.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public people = data
  constructor() { }

  getData(): Observable<Person[]> {
    return of(this.people);
  }
}
