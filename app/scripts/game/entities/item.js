//--------------------------------------------------------------------------
// Item
//--------------------------------------------------------------------------
Game.addEntity('item', function () {
  Entity.apply(this, arguments);
  this.animFrame = parseInt(this.properties.frame);
  this.collide = function (element) {
    if (element.type === 'player' && !this.dead && Game.input.action) {
      Game.player.get(this);
      Game.input.action = false;
      this.dead = true;
    }
    if (element.family === 'bullets' && this.properties.id === 'tnt') {
      this.dead = true;
      Game.elements.add('explosion2', {x: this.x - 24, y: this.y - 110});
    }
  };
  this.update = function () {
    if (this.onScreen()) {
      this.force.y += Game.map.gravity;
      this.move();
    }
  };
});