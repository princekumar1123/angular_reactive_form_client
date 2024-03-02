import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  mobile: number,
  address: string,
  courses: string,
  pin?: number,
  skill?: string
}

const ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'email', 'mobile', 'address', 'courses'];
  dataSource: PeriodicElement[] = []
  constructor(private routeRef: Router) {
    const newData = JSON.parse(localStorage.getItem('localData') || '[]')

    if (ELEMENT_DATA != undefined) {
      ELEMENT_DATA.splice(0, ELEMENT_DATA.length)
      newData.forEach((e: PeriodicElement): void => {
        e.dob = (e.dob.slice(0, 10))
      })
      ELEMENT_DATA.push(...newData)
      this.dataSource.push(...newData)
    }
  }
  addData(): void {
    const randomElementIndex: number = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.routeRef.navigate(["register"])
  }
}
