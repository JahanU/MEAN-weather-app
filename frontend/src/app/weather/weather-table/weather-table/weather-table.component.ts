import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { location } from 'src/app/models/location.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})


export class WeatherTableComponent {

  @Input() locationFreqData: location[];
  displayedColumns: string[] = ['locationName', 'count'];
  dataSource: MatTableDataSource<location>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.locationFreqData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalCount() {
    if (this.locationFreqData) {
      return this.locationFreqData
        .map((row) => row.count)
        .reduce((acc, curr) => acc + curr);
    }
  }
}
