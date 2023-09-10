import { Component, OnInit } from '@angular/core';
import { IUser, IUserData } from "../../Models/user";
import { UsersServices } from '../../services/users.services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UsersServices) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: IUserData): void => {
      this.users = users.results;
    });
  }
}
