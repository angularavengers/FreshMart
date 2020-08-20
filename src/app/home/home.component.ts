import { vegitables } from './../const/product';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

const DATA= vegitables;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
 })

export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(DATA);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
 
 
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}


