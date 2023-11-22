import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Farm } from '../models/farm.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private readonly API_URL = "http://localhost:8080/API/Farms";

  constructor(private http: HttpClient) { }

  getFarmById(farmId: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.API_URL}/${farmId}`);
  }

  getAllFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.API_URL);
  }

  searchFarms(query: string): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${this.API_URL}/search?q=${query}`);
  }

  createFarm(farm: Farm): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/Add`, farm);
  }

  updateFarm(farm: Farm, farmId: number | null): Observable<any> {
    return this.http.put(`${this.API_URL}/${farmId}`, farm);
  }

  deleteFarm(farmId: number | null): Observable<any> {
    return this.http.delete(`${this.API_URL}/${farmId}`);
  }
}
