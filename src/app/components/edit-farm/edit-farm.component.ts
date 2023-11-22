import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FarmLocation } from 'src/app/models/farm-location.model';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  styleUrls: ['./edit-farm.component.css'],
})
export class EditFarmComponent {
  farm: Farm;
  farmLocation: FarmLocation;

  updateFarmForm: FormGroup;
  nameInput: FormControl;
  streetInput: FormControl;
  cityInput: FormControl;
  countryInput: FormControl;
  latitudeInput: FormControl;
  longitudeInput: FormControl;

  constructor(
    private farmService: FarmService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // form validation
    this.nameInput = new FormControl('', Validators.required);
    this.streetInput = new FormControl('');
    this.cityInput = new FormControl('', Validators.required);
    this.countryInput = new FormControl('', Validators.required);
    this.latitudeInput = new FormControl('', [
      Validators.required,
      Validators.min(-90.0),
      Validators.max(90.0),
    ]);
    this.longitudeInput = new FormControl('', [
      Validators.required,
      Validators.min(-180.0),
      Validators.max(180.0),
    ]);

    this.updateFarmForm = new FormGroup({
      name: this.nameInput,
      street: this.streetInput,
      city: this.cityInput,
      country: this.countryInput,
      latitude: this.latitudeInput,
      longitude: this.longitudeInput,
    });
    this.farmLocation = new FarmLocation('', '', '', 0, 0);
    this.farm = new Farm(null, '', this.farmLocation, []);
  }

  ngOnInit(): void {
    // Get farm by its ud
    const farmId: number | null = this.activatedRoute.snapshot.params['id'];

    if (farmId !== null) {
      this.farmService.getFarmById(farmId).subscribe({
        next: (farm: Farm) => {
          this.farm = farm;

          // Set default values for form
          this.nameInput.setValue(farm.name);
          this.streetInput.setValue(farm.location.street);
          this.cityInput.setValue(farm.location.city);
          this.countryInput.setValue(farm.location.country);
          this.latitudeInput.setValue(farm.location.latitude);
          this.longitudeInput.setValue(farm.location.longitude);
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

  // Update farm
  updateFarm(): void {
    const farmLocation = new FarmLocation(
      this.updateFarmForm.value.street,
      this.updateFarmForm.value.city,
      this.updateFarmForm.value.country,
      this.updateFarmForm.value.latitude,
      this.updateFarmForm.value.longitude
    );
    const farm: Farm = new Farm(
      this.farm.id,
      this.updateFarmForm.value.name,
      farmLocation,
      []
    );

    this.farmService.updateFarm(farm, this.farm.id).subscribe({
      next: () => {
        // Redirect to detail page
        this.router.navigate(['/farms', this.farm.id]);
        // Display success message
        this.snackBar.open(
          `Farm ${farm.id} has been updated successfully!`,
          'Close',
          {
            duration: 20000,
          }
        );
      },
      error: (error) => {
        console.log(error);
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
