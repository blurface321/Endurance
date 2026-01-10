import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase!: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async addUser(formData: any) {
    try {
      const { data, error } = await this.supabase
        .from('waitlist_users')
        .insert([formData]);

        if(error) {
          console.error('Supabase API Error:', error);
          return error
        }

        return data
    } catch (error) {
      console.error(error)
      return error
    }

  }
}
