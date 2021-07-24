interface Props {
  ww: number;
  wh: number;
  colors: string[];
}

class Factory {
  x: number;

  y: number;

  color: string;

  dest: {
    x: number;
    y: number;
  };

  radius = Math.random() * 5 + 1; // 1 ~ 6(원의 반지름)

  ratioX = 0; // x축 기준 종착지와 현재 위치의 비율. 0에 가까울 수록 원점에 위치

  ratioY = 0; // y축 기준 종착지와 현재 위치의 비율. 0에 가까울 수록 원점에 위치

  friction = Math.random() * 0.05 + 0.94; // 0.94 ~ 0.99(원점에 도달하게 하도록 하는 값)

  vx = (Math.random() - 0.5) * 20; // -10 ~ 10(ratio와 friction을 연산한 값을 저장)

  vy = (Math.random() - 0.5) * 20; // -10 ~ 10(ratio와 friction을 연산한 값을 저장)

  constructor({ ww, wh, colors }: Props) {
    this.x = Math.random() * ww; // x값 기준으로 랜덤하게 x값 재조정
    this.y = Math.random() * wh; // y값 기준으로 랜덤하게 y값 재조정
    this.color = colors[Math.floor(Math.random() * 6)]; // 색상 랜덤 선택
    this.dest = {
      x: ww,
      y: wh,
    }; // 도착지는 원래 x와 y값으로 설정
  }

  render(ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }, clickCount: number) {
    this.ratioX = (this.dest.x - this.x) / 1000; // x축 기준 종착지와 현재 위치의 비율. 0에 가까울 수록 원점에 위치
    this.ratioY = (this.dest.y - this.y) / 1000; // y축 기준 종착지와 현재 위치의 비율. 0에 가까울 수록 원점에 위치
    this.vx += this.ratioX; // 비율값을 더함
    this.vy += this.ratioY; // 비율값을 더함
    this.vx *= this.friction; // 원점 도달값을 곱함
    this.vy *= this.friction; // 원점 도달값을 곱함

    this.x += this.vx; // 모든 연산이 완료된 결과값을 더해줌
    this.y += this.vy; // 모든 연산이 완료된 결과값을 더해줌

    // 원형을 그림
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // 클릭 지점과 circle의 거리 차이를 구함
    // x^2 + y^2 = z^2이기 때문에, z^2에다가 sqrt를 해서 루트를 씌우면 반지름 값이 됨
    const a = this.x - mouse.x;
    const b = this.y - mouse.y;
    const distance = Math.sqrt(a * a + b * b) - 50;

    // 반지름 값이 작을 경우
    if (distance < clickCount * 100) {
      this.ratioX = (this.x - mouse.x) / 100;
      this.ratioY = (this.y - mouse.y) / 100;
      this.vx += this.ratioX;
      this.vy += this.ratioY;
    }
  }
}

export default Factory;
