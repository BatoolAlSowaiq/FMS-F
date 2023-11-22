import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css'],
})
export class FarmsComponent implements OnInit {

  farms: Farm[];
  
  // To control paginator 
  totalFarms: number = 0; 
  pageIndex: number = 0;
  pageSize: number = 9;


  // Search 
  searchInput$ = new Subject<string>();
  query: string = '';
  isSearchVisible: boolean = false;
  
  constructor(private farmService: FarmService, private snackBar: MatSnackBar) {
  
    this.farms = [];

    // Apply search 
    this.searchInput$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.farmService.searchFarms(query))
    )
    .subscribe({
      next: (farms: Farm[]) => {
        this.farms = farms;
      },
      error: (e) =>{
        console.error('No match:', e);
        this.snackBar.open(
          'Sorry, no farms were found matching your search input.. ',
          'Close',
          {
            duration: 20000,
          }
        );
        
      }
    });
  }

  // Load all farms
  ngOnInit(): void {
    this.updateFarmList();
  }

  // Fetch data from API 
  updateFarmList(): void {
    this.farmService.getAllFarms().subscribe({
      next: (farms: Farm[]) => {
        this.farms = farms;
        this.totalFarms = farms.length;
      },
      error: (e) => {
        console.error('Failed to fetch farms:', e);
        this.snackBar.open(
          'Error has been acquired. Pleas, Try again.. ',
          'Close',
          {
            duration: 20000,
          }
        );
      },
    });
  }

  // Control page changes
  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  // Control visibility of search 
  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.query = '';
      this.searchInput$.next(this.query);
    }
  }

}
