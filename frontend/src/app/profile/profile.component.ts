import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userUrl = "http://localhost:8080/api/user/";
  userId: number;
  loadCompleted: boolean = false;
  editUser: boolean = false;
  editDetails: boolean = false;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  // user: User;

  constructor(private route: ActivatedRoute, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    // don't need this anymore because the id is sent through the user object 
    // this.id = this.route.snapshot.paramMap.get("id");
    // this.userUrl += this.id;
    

    this.isLoggedIn = !!this.tokenStorageService.getToken();
   

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.email;
      this.userId = user.id;

      console.log(this.userId);

      this.loadUser();
    } else {
      this.router.navigate(['/login']);
    }
    
  }
 
  
  loadUser() {
    fetch(this.userUrl + this.userId, {method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Barer ' + this.tokenStorageService.getToken()
      },
    }).then(function(response) {
      response.json().then(function(json) {

        // console.log(JSON.stringify(json));
        // this.user = new User(json.username, json.email, json.password);
        // this.user.id = json.id;

        console.log(JSON.stringify(this.user));

        this.loadCompleted = true;
      }.bind(this));
    }.bind(this));
  }

  editProfile() {
   if (this.editUser = true){
    this.editUser = false;
}
else (this.editUser = true)
  }

 
  // onEditUserClose() {
  //   console.log("event received");
  //   this.editUser = false;
  // }

  

 

}

