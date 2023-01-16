const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,candy,ground;
var candy_con;
var candy_con_2;
var candy_con_3;
var rope3;

var bg_img;
var food;
var om_nom_img, om_nom ;

var button,button2,button3;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('cut_rope_bg.png');
  food = loadImage('Candy.png');
  om_nom_img = loadImage('om_nom.png');
  
  bk_song = loadSound('game_sound.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("om_nom_eating.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  frameRate(120);

  bk_song.play();
  bk_song.setVolume(0.20);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_button.png');
  button.position(750,120);
  button.size(70,70);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_button.png');
   button2.position(300,200);
   button2.size(70,70);
   button2.mouseClicked(drop2);

   button3= createImg('cut_button.png');
   button3.position(600,150);
   button3.size(70,70);
   button3.mouseClicked(drop2);
 
   rope = new Rope(11,{x:750,y:120});
   rope2 = new Rope(11,{x:300,y:200});
   rope3 = new Rope(11,{x:600,y:150});


  mute_btn = createImg('mute-png-open-2000.png');
  mute_btn.position(width-100,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  
  om_nom = createSprite(700,800,100,100);
  om_nom.addImage(om_nom_img)
  om_nom.scale = 0.2;



  
  candy = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,candy);

  candy_con = new Link(rope,candy);
  candy_con_2 = new Link(rope2,candy);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(food,candy.position.x,candy.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(candy,om_nom)==true)
  {
    World.remove(engine.world,candy);
    candy = null;
    om_nom.changeAnimation('eating');
    eating_sound.play();
  }

  if(candy!=null && candy.position.y>=650)
  {
    om_nom.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    candy=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  candy_con.dettach();
  candy_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  candy_con_2.dettach();
  candy_con_2 = null;
}



function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

