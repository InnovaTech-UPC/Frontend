import { Component } from '@angular/core';
import {RegisterFarmerComponent} from "../../components/register-farmer/register-farmer.component";

@Component({
  selector: 'app-signup-farmer',
  standalone: true,
  imports: [
    RegisterFarmerComponent
  ],
  templateUrl: './signup-farmer.component.html',
  styleUrl: './signup-farmer.component.css'
})
export class SignupFarmerComponent {

}
