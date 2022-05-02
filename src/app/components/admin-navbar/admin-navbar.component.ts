import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAdmin } from 'src/app/services/admin-service.service';
import { MatListItem } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private _router: Router, private adminService: ServiceAdmin) { }

  logoutAdmin(){
    this._router.navigateByUrl('/admin/login-admin');
    this.adminService.logoutAdmin();
  }


  ngOnInit(): void {
  }

}
