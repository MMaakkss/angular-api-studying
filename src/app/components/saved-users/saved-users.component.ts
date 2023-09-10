import { Component, OnInit } from '@angular/core';
import { IUser } from '../../Models/user';

@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styleUrls: ['saved-users.component.scss'],
})
export class SavedUsersComponent implements OnInit {
  users: IUser[] = [];

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('savedUsers');

    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }
}
