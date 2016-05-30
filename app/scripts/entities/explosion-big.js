game.addEntity('explosion-big', class extends Entity {
  constructor(obj, game) {
    super(obj, game);
    this.family = 'traps';
    this.type = 'explosion2';
    this.width = 48;
    this.height = 112;
    this.damage = 5;
    this.animation = {x: 0, y: 0, w: 48, h: 112, frames: 21, fps: 30, loop: true};
  }

  update() {
    if (this.onScreen()) {
      this.activated = true;
    }
    if (this.activated && !this.dead) {
      this.animate();
    }
    if (this.animFrame > 5) {
      this.damage = 0;
    }
    if (this.animFrame === this.animation.frames - 1) {
      this.dead = true;
    }
  }
});