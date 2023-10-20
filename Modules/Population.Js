class Population {
   constructor(amount) {
      this.pop = []
      this.best = NaN
      for (let i=1;i<=amount;i++){
         this.pop.push(new Rocket())
      }
   }

   Step() {
      for (const r of this.pop) {
         r.Update()
         r.Border()
         for (const b of Barriers) {
            r.CheckColliding(b)
         }
         r.Show()
      }
   }

   Evaluate() {
      let maxfit = 0
      for (const r of this.pop) {
         let fitness = r.CalcFitness()
         if (fitness > maxfit) {
            maxfit = fitness
            this.best = r
         }
      }

      console.log("Max fit",maxfit)

      for (const r of this.pop) {
         if (r.fitness != 0 && maxfit != 0) {
            r.fitness = r.fitness/maxfit
         }
      }

      this.matingpool = []
      for (const r of this.pop) {
         let n = ceil(r.fitness*100)
         for (let i=0;i<n;i++) {
            this.matingpool.push(r)
         }
      }
   }

   Selection() {
      let best = new Rocket(this.best.dna)
      best.color = color("#FAAA8D")

      let newPop = []
      for (let i=0;i<MaxPop;i++) {
         let PA = random(this.matingpool).dna
         let PB = random(this.matingpool).dna
         let n = PA.Crossover(PB).Mutate()
         newPop.push(new Rocket(n))
      }
      newPop.push(best)//to render him on top
      this.pop = newPop
      this.matingpool = undefined
      newPop = undefined
   }

   Get() {
      //get all genes
   }
}