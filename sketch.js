rockets = []
let population

let generations = 1
let count = 0

function setup() {
   createCanvas(700, 700);
   StartPos = createVector(width/2,height-20)
   Target = createVector(width/2,20)

   Barriers.push(
      new Barrier(width*1/3,height/2,width*2/3,20)
   )

   population = new Population(MaxPop)

   console.log("Generation:",generations)
}
 
function draw() {
   

   background("#201E1F")
   fill("#FF4000")
   circle(Target.x,Target.y,TargetThreshold*2)

   for (const b of Barriers) {
      b.show()
   }

   population.Step()
   count += 1

   if (count >= LifeSpan) {
      population.Evaluate()
      population.Selection()

      count = 0
      generations+=1
      console.log("Generation:",generations)
   }
}

