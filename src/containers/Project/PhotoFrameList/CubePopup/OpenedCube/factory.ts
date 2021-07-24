/**
 * @param {number} y 글자의 y 좌표값
 * @param {number} width 글자의 가로 크기
 * @param {number} height 글자의 세로 크기
 * @param {number} fontSize 글자 사이즈
 * @param {string} text 분할 된 단어의 문자
 */

interface FactoryProps {
  x: number;
  height: number;
  width: number;
  fontSize: number;
  text: string;
}

class Factory {
  x: number;

  height: number;

  width: number;

  fontSize: number;

  text: string;

  speed = 2;

  constructor({ x, height, width, fontSize, text }: FactoryProps) {
    this.x = x;
    this.height = height;
    this.width = width;
    this.fontSize = fontSize;
    this.text = text;
  }

  drawText(ctx: CanvasRenderingContext2D) {
    this.x -= this.speed;
    ctx.font = `${this.fontSize}px serif`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(222, 222, 222, 0.2)";
    ctx.fillText(this.text, this.x, this.height / 2);
  }
}

export default Factory;
