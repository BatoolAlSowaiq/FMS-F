import { FarmLocation } from './farm-location.model';

export class Farm {
  constructor(
    private _id: number | null,
    private _name: string,
    private _location: FarmLocation,
    private _employees: any[]
  ) {}

  get id(): number | null {
    return this._id;
  }
  set id(value: number | null) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get location(): FarmLocation {
    return this._location;
  }

  set location(location: FarmLocation) {
    this._location = location;
  }
  public get employees(): any[] {
    return this._employees;
  }
  public set employees(value: any[]) {
    this._employees = value;
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      location: this._location.toJSON(),
      employees: this._employees,
    };
  }
}
