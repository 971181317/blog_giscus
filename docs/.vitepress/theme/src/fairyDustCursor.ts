export interface FiryDustCursorOptions {
  colors?: string[];
  element?: HTMLElement;
  canvasId?: string;
}

export function fairyDustCursor(options: FiryDustCursorOptions = {}) {
  const possibleColors = options.colors || ["#D61C59", "#E7D84B", "#1B8798"];
  const hasWrapperEl = !!options.element;
  const element = options.element || document.body;

  let width = window.innerWidth;
  let height = window.innerHeight;
  const cursor = { x: width / 2, y: width / 2 };
  const lastPos = { x: width / 2, y: width / 2 };
  const particles = [] as Particle[];
  const canvImages = [] as HTMLCanvasElement[];
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  const canvasId = options.canvasId || "fairyDustCursor-canvas";

  const char = "*";

  function init() {
    if (isExist()) return;
    canvas = document.createElement("canvas");
    canvas.id = canvasId;
    canvas.style.zIndex = "99999";
    context = canvas.getContext("2d");
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";

    if (hasWrapperEl) {
      canvas.style.position = "absolute";
      element.appendChild(canvas);
      canvas.width = element.clientWidth;
      canvas.height = element.clientHeight;
    } else {
      canvas.style.position = "fixed";
      element.appendChild(canvas);
      canvas.width = width;
      canvas.height = height;
    }

    context.font = "21px serif";
    context.textBaseline = "middle";
    context.textAlign = "center";

    for (const color of possibleColors) {
      const measurements = context.measureText(char);
      const bgCanvas = document.createElement("canvas");
      const bgContext = bgCanvas.getContext("2d");

      bgCanvas.width = measurements.width;
      bgCanvas.height =
        measurements.actualBoundingBoxAscent +
        measurements.actualBoundingBoxDescent;

      bgContext.fillStyle = color;
      bgContext.textAlign = "center";
      bgContext.font = "21px serif";
      bgContext.textBaseline = "middle";
      bgContext.fillText(
        char,
        bgCanvas.width / 2,
        measurements.actualBoundingBoxAscent
      );

      canvImages.push(bgCanvas);
    }

    bindEvents();
    loop();
  }

  // 检验是否绘制过
  function isExist(): boolean {
    const canvas = element.getElementsByTagName("canvas");
    for (const c in canvas) {
      if (canvas[c].id === canvasId) {
        return true;
      }
    }
    return false;
  }

  // Bind events that are needed
  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    if (hasWrapperEl) {
      canvas.width = element.clientWidth;
      canvas.height = element.clientHeight;
    } else {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function onTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(
          e.touches[i].clientX,
          e.touches[i].clientY,
          canvImages[Math.floor(Math.random() * possibleColors.length)]
        );
      }
    }
  }

  function onMouseMove(e: MouseEvent) {
    window.requestAnimationFrame(() => {
      if (hasWrapperEl) {
        const boundingRect = element.getBoundingClientRect();
        cursor.x = e.clientX - boundingRect.left;
        cursor.y = e.clientY - boundingRect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }

      const distBetweenPoints = Math.hypot(
        cursor.x - lastPos.x,
        cursor.y - lastPos.y
      );

      if (distBetweenPoints > 1.5) {
        addParticle(
          cursor.x,
          cursor.y,
          canvImages[Math.floor(Math.random() * possibleColors.length)]
        );

        lastPos.x = cursor.x;
        lastPos.y = cursor.y;
      }
    });
  }

  function addParticle(x: number, y: number, color: HTMLCanvasElement) {
    particles.push(new Particle(x, y, color));
  }

  function updateParticles() {
    context.clearRect(0, 0, width, height);

    // Update
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(context);
    }

    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles.splice(i, 1);
      }
    }
  }

  function loop() {
    updateParticles();
    requestAnimationFrame(loop);
  }

  init();
}

class Particle {
  initialLifeSpan: number;
  lifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  canv: HTMLCanvasElement;

  constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
    const lifeSpan = Math.floor(Math.random() * 30 + 60);
    this.initialLifeSpan = lifeSpan; //
    this.lifeSpan = lifeSpan; //ms
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: Math.random() * 0.7 + 0.9,
    };
    this.position = { x: x, y: y };
    this.canv = canvasItem;
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;

    this.velocity.y += 0.02;

    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.drawImage(
      this.canv,
      this.position.x - (this.canv.width / 2) * scale,
      this.position.y - this.canv.height / 2,
      this.canv.width * scale,
      this.canv.height * scale
    );
  }
}
