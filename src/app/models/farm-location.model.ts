export class FarmLocation {
  constructor(
    private _street: string,
    private _city: string,
    private _country: string,
    private _latitude: number,
    private _longitude: number
  ) {}

  get street(): string {
    return this._street;
  }

  set street(street: string) {
    this._street = street;
  }

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get country(): string {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(latitude: number) {
    this._latitude = latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(longitude: number) {
    this._longitude = longitude;
  }

  public toJSON(): object {
    return {
      street: this._street,
      city: this._city,
      country: this._country,
      latitude: this._latitude,
      longitude: this._longitude,
    };
  }
}
