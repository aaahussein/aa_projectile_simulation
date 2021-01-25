//Constants
const ay = 9.8; //(gravitational acceleration constat 9.8 m/s^2)
const canvas_X = 400; //the canvas width
const canvas_Y = 400; //the canvas height
const projectile_radius = 10; //the radius of the ciircle representing the projectile
const rect_width = 40;

//Global variables section
let t = 0; //simulation time (gets incremented every frame after starting simulation)
let v ; //velocity (gets its value from the velocity slider)
let theta ; //angle (gets its value from the angle slider)
let h; //the height (from where the projectile is projected)
let fired = false; //when the start simulation button is clicked this value will be true until end of simulation
let xMeasurement = document.getElementById("xValue"); //the x-coordinate measurement in the table
let yMeasurement = document.getElementById("yValue"); //the y-coordinate measurement in the table
let vSlider = document.getElementById("velocity"); //the velocity slider element
let aSlider = document.getElementById("angle"); //the angle slider element
let hSlider = document.getElementById("height") //the height slider


//This function is called only once when the page load up
//it creates the canvas, attach event listeners, initializes the velocity and angle labels (beside the sliders)
function setup() {
  createCanvas(canvas_X, canvas_Y);
  document.getElementById("simulate").addEventListener("click", function(x){
    fired = true;
    //disable sliders while simulation
    vSlider.disabled = true;
    aSlider.disabled = true;
    hSlider.disabled = true;
  });
  updateVelocity(vSlider.value);
  updateAngle(aSlider.value);
  updateHeight(hSlider.value);
}

//This function gets called every frame (it is from p5.js framework)
function draw() {
  background(220);
  let theta_val = aSlider.value;
  theta = (theta_val/180) * Math.PI; //convert to radian
  v= vSlider.value;
  h = hSlider.value;
  
  if(fired){
    projectile();
  } else{
    //In case not in simulation then draw a line that gives the user a 
    //visualisation about chosen angle and velocity
    let line_length = v;
    let line_start = {x:projectile_radius, y: canvas_Y - h - projectile_radius};
    let line_direction = {x:Math.cos(theta), y:-Math.sin(theta)};
    let line_end = {x: line_start.x + line_length* line_direction.x, 
                    y: line_start.y + line_length*line_direction.y}
    line(line_start.x, line_start.y, line_end.x, line_end.y);
    circle(line_start.x ,line_start.y, projectile_radius)  ;  
    yMeasurement.innerText = h;
  }
  //draw a rectangle that gives visualization about projection height
  rect(0, canvas_Y-h, rect_width, h ) ;
  
  
}

//This function performs the projectile calculations, updates the x and y measuremens in the table
function projectile(){
  let vx_0 = v * Math.cos(theta);
  let vy_0 = - v* Math.sin(theta) ; 
  //the negative in the y because the pixel coordinates is inverted (the top has y=- and it increases downwards)

  let x  = vx_0 * t;
  let y =  vy_0 * t + 0.5 * ay * t * t + canvas_Y - h;
  xMeasurement.innerText = Math.floor(x);
  yMeasurement.innerText = Math.floor(canvas_Y - y); //400-y because the bottom left point has pixel coordinate of 400
  
  //if the projectile gets out of boundries then stop the simulation
  if (y > canvas_Y || x > canvas_X){
    stopSimulation();
  }
  //draw the projectile at the new calculated position
  circle(x,y,projectile_radius);
  t+= 0.05;  //increment time
}

function stopSimulation(){
  t = 0;
  xMeasurement.innerText = 0;
  yMeasurement.innerText = 0;
  vSlider.disabled = false;
  aSlider.disabled = false;
  hSlider.disabled = false;
  fired = false; 
}

//To update velocity, angle and height labels (to display value of slider beside it)
function updateVelocity(vVal){
  document.getElementById("vVal").innerText = vVal;
}
function updateAngle(aVal){
  document.getElementById("aVal").innerText = aVal;
}
function updateHeight(hVal){
  document.getElementById("hVal").innerText = hVal;
}