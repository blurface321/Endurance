import { Component } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../services/supabase';
import { environment } from '../../environment/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waitlist',
  imports: [
    FormsModule
  ],
  templateUrl: './waitlist.html',
  styleUrl: './waitlist.scss',
})
export class Waitlist {
  private supabaseClient!: SupabaseClient
  public emailId: string = ''
  public emailError: string = ''
  public isSuccess: boolean = false
  public isLoading: boolean = false

  constructor(private supabaseService: Supabase){}

  ngOnInit(): void {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )  
  }

  async addToWaitlist(){
    let emailValid = this.validateEmail()

    if(!emailValid.valid){
      this.emailError = emailValid.msg
      setTimeout(() => { this.emailError = '' }, 3000);
      return; 
    }

    this.isLoading = true
    let formData = {
      email: this.emailId
    }


    this.supabaseService.addUser(formData)
      .then((response:any) => {
        console.log(response.code)
        if(response.code == '23505'){
          this.isLoading = false
          this.isSuccess = true
        }
      })
      .catch((error) => {
        this.isLoading = false
        this.emailError = error
      })

      setTimeout(() => {
        this.isSuccess = true
      }, Math.random()*3000);
  }

  validateEmail(): {valid: boolean, msg: string}{
    const email = this.emailId.trim()

    if(!email) {
      return { valid: false, msg: 'Email is required'};
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)){
      return { valid: false, msg: 'Please enter a valid email address' };
    }

    if(email.endsWith('@test.com')){
      return { valid: false, msg: 'Test domainZs are not allowed' };
    }

    return { valid: true, msg: '' };
  }
}
