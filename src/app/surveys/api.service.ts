import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly URL = "https://vm-surveys-default-rtdb.asia-southeast1.firebasedatabase.app/";

  constructor() { }
}
