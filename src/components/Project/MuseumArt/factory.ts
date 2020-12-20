interface Props {
  width: number;
  height: number;
  colors: string[];
}

class Factory {
  x: number;

  y: number;

  rgba: string;

  radius = Math.round(Math.random() * 1) + 1;

  vx = Math.round(Math.random() * 2) - 1.5;

  vy = Math.round(Math.random() * 2) - 1.5;

  constructor({ width, height, colors }: Props) {
    this.x = Math.round(Math.random() * width);
    this.y = Math.round(Math.random() * height);
    this.rgba = colors[Math.round(Math.random() * 3)];
  }
}

export default Factory;
