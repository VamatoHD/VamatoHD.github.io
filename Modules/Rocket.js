class Dna {
   constructor(genes) {
      this.genes = genes || []
      if (this.genes.length == 0){
         for (let i = 0;i<=LifeSpan+1;i++){
            this.genes.push(createVector(random(-Mag,Mag),random(-Mag,Mag)))
         }
      }
   }

   Crossover(partner) {
      const mid = floor(random(0,this.genes.length))
      const genes = [...this.genes.slice(0,mid),...partner.genes.slice(mid+1)]
      return new Dna(genes)
   }

   Mutate() {
      for (let i=0;i<this.genes.length;i++){
         if (random(0,1)<MutationRate) {
            this.genes[i] = createVector(random(-Mag,Mag),random(-Mag,Mag))
         }
      }
      return this
   }

   Get(i) {
      return this.genes[i] || createVector(0,0)
   }
}

class Rocket {
   constructor(dna) {
      this.acc = createVector()
      this.vel = createVector()
      this.pos = StartPos.copy()
      this.dis = 0

      this.color = color(255,255,255)

      this.crashed = false
      this.finished = false

      this.fitness = 0
      this.dna = dna || new Dna()
      this.count = 0
   }

   ApplyForce(Force) {
      if (this.crashed || this.finished) { return }
      this.acc.add(Force)
   }

   Border() {
      if (this.crashed || this.finished) { return }
      this.crashed = (
         this.pos.x < 0 ||
         this.pos.y < 0 ||
         this.pos.x > width ||
         this.pos.y > height
      )
   }

   CheckColliding(barrier) {
      if (this.crashed || this.finished) { return }
      this.crashed = barrier.collision(this)
   }

   Update() {
      if (this.crashed || this.finished) {
         return;
      }
      
      this.ApplyForce(this.dna.Get(this.count))

      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0.0)
      this.dis += this.vel.x+this.vel.y

      if (dist(this.pos.x,this.pos.y,Target.x,Target.y) < TargetThreshold) {
         this.pos = Target.copy()
         this.finished = true
         return
      }

      this.count += 1
   }

   Show() {
      push()
      translate(this.pos.x,this.pos.y)
      rotate(this.vel.heading())
      rectMode(CENTER)
      fill(this.color)
      rect(0,0,30,10)
      pop()
   }

   CalcFitness() {
      let d = dist(this.pos.x,this.pos.y,Target.x,Target.y)
      if (d == 0){
         d = .01
      }
      let f = (1/d)
      if (this.finished) {
         f += pow((LifeSpan/this.count),2)-1
      }
      if (this.crashed) {
         //f /= d
         f = .00001
      }
      this.fitness = f
      return f
   }
}