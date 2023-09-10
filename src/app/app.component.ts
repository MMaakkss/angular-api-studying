import { Component, OnInit } from '@angular/core';
import { UsersServices } from './components/services/users.services';
import { IUser } from './Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UsersServices) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.results;
    });
  }
}
