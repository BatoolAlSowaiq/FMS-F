import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';
import { FarmLocation } from 'src/app/models/farm-location.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger,style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-single-farm',
  templateUrl: './single-farm.component.html',
  styleUrls: ['./single-farm.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class SingleFarmComponent implements OnInit {
  farm: Farm;
  error: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private farmService: FarmService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.farm = new Farm(null, '', new FarmLocation('', '', '', 0, 0), []);
  }

  // Load farm details
  ngOnInit(): void {
    this.reloadFarm();
  }

  // Fetch farm data
  reloadFarm(): void {
    const farmId: number | null = this.activatedRoute.snapshot.params['id'];

    // If the farm id is not null fetch the farm info from the api
    if (farmId !== null) {
      this.farmService.getFarmById(farmId).subscribe({
        next: (farm: Farm) => {
          this.farm = farm;
        },
        error: (e) => {
          console.error('Failed to fetch farms:', e);
          //this.error = e;
        },
      });
    }
  }

  // Delete farm
  deleteFarm(): void {
    // Make sure user wants to delete their farm
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      // Perform the delete action
      this.farmService.deleteFarm(this.farm.id).subscribe({
        next: () => {
          // Redirect to farm list
          this.router.navigate(['/farms']);

          // Display success message
          this.snackBar.open(
            `Farm ${this.farm.id} has been deleted successfully!`,
            'Close',
            {
              duration: 20000,
            }
          );
        },
        error: (error) => {
          console.log(error);
          // Display error msg
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
  }
}
