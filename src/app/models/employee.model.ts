export class Employee {
  constructor(
    private _id: number | null,
    private _name: string,
    private _position: string,
    private _imageUrl: string,
    private _farmId: number | null
  ) {}

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get position(): string {
    return this._position;
  }
  public set position(value: string) {
    this._position = value;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }
  public set imageUrl(value: string) {
    this._imageUrl = value;
  }

  public get id(): number | null {
    return this._id;
  }
  public set id(value: number | null) {
    this._id = value;
  }

  public get farmId(): number | null {
    return this._farmId;
  }
  public set farmId(value: number | null) {
    this._farmId = value;
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      position: this._position,
      imageUrl: this._imageUrl,
      farmId: this._farmId,
    };
  }
}
