class Barrier {
   constructor(x,y,w,h) {
      this.x = x-w/2
      this.y = y-h/2
      this.w = w
      this.h = h
   }

   collision(r){
      const x = r.pos.x
      const y = r.pos.y

      return (
         x > this.x &&
         y > this.y &&
         x < this.x+this.w &&
         y < this.y+this.h
      )
   }

   show() {
      fill("#50B2C0")
      noStroke()
      rect(this.x,this.y,this.w,this.h)
   }
}