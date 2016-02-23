//--------------------------------------------------------------------------
// Spear
//--------------------------------------------------------------------------
Game.addEntity('spear', function () {
  Entity.apply(this, arguments);
  this.family = 'traps';
  this.damage = 20;
  this.maxHeight = Game.map.spriteSize * 2;
  this.animation = {x: 0, y: 0, w: this.width, h: this.height, frames: 4, fps: 20, loop: true};
  this.draw = function (ctx, image) {
    //Game.renderer.fontPrint(''+this.PlayerM.toFixed(2), this.x+Game.camera.x, -20+this.y+Game.camera.y);
    ctx.drawImage(image,
      this.animation.x + (this.animFrame * this.animation.w), this.animation.y + this.animOffset,
      this.width, this.height,
      Math.floor(this.x + Game.camera.x), Math.floor(this.y + Game.camera.y), this.width, this.height);
  };
  this.update = function () {
    if (this.onScreen()) {
      this.seesPlayer();
      if ((this.animFrame === 0 && Math.round(Math.random() * 20) === 0) || this.animFrame > 0) {
        this.animate();
      }
      if (this.PlayerM >= 0 && this.PlayerM < 4 && Game.player.x >= this.x - Game.player.width - Game.map.spriteSize && Game.player.x <= this.x + this.width + Game.map.spriteSize) {
        if (this.height < this.maxHeight) {
          this.y -= 2;
          this.height += 2;
        }
      } else if (this.height > 8) {
        this.y += 1;
        this.height -= 1;
      }
    }
  };
});