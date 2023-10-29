export interface Renderable {
  get id(): string;
  render(ctx: CanvasRenderingContext2D): void;
}
