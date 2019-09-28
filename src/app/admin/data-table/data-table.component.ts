import { User } from './../../shared/users.model';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  public displayedColumns = ['firstname', 'dateOfBirth', 'username', 'email', 'details'];
  public dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userService.getAllUsers()
        .subscribe((data) => {
          this.dataSource.data = data as User[];
        });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  redirectToDetails(id: number) {
    this.router.navigate(['admin-users', id], {relativeTo: this.route});
  }

}
