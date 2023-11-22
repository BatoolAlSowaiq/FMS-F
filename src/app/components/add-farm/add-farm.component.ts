import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FarmLocation } from 'src/app/models/farm-location.model';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css'],
})
export class AddFarmComponent implements OnInit {
  createFarmForm: FormGroup;
  nameInput: FormControl;
  streetInput: FormControl;
  cityInput: FormControl;
  countryInput: FormControl;
  latitudeInput: FormControl;
  longitudeInput: FormControl;

  constructor(
    private farmService: FarmService,
    private snackBar: MatSnackBar,
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

    this.createFarmForm = new FormGroup({
      name: this.nameInput,
      street: this.streetInput,
      city: this.cityInput,
      country: this.countryInput,
      latitude: this.latitudeInput,
      longitude: this.longitudeInput,
    });
  }

  ngOnInit(): void {}

  createFarm(): void {
    const farmLocation = new FarmLocation(
      this.createFarmForm.value.street,
      this.createFarmForm.value.city,
      this.createFarmForm.value.country,
      this.createFarmForm.value.latitude,
      this.createFarmForm.value.longitude
    );
    const farm: Farm = new Farm(
      null,
      this.createFarmForm.value.name,
      farmLocation,
      []
    );

    // Store farm in database
    this.farmService.createFarm(farm).subscribe({
      next: () => {
        // Reset form

        // Redirect the user to all farms page 
        this.router.navigate(['/farms']);
        // Display success message
        this.snackBar.open(
          `Farm ${farm.name} has been added successfully!`,
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
