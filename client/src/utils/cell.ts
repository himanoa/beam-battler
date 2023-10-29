export class Cell<T> {
  constructor(private innerValue: T) {}

  replace(data: T): void {
    this.innerValue = data;
  }

  get value(): T {
    return this.innerValue;
  }
}
