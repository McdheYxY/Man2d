import Matter from "matter-js";
import "./style.css";
import texture from "./HTML.png";
import MatterWrap from "matter-wrap";
import poly from "poly-decomp";
import "./pathseg.js";
import mikuBody from "./miku.js";
var height = window.innerHeight,
  width = window.innerWidth;

Matter.use(MatterWrap);

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Common = Matter.Common,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices,
  MouseConstraint = Matter.MouseConstraint,
  Plugin = Matter.Plugin;
console.log(Plugin.dependencies(Matter));

Common.setDecomp(poly);
// create an engine
var engine = Engine.create();
// engine.gravity.x = 0;
engine.gravity.y = 0.1;
// create a renderer
var render = Render.create({
  element: document.querySelector("#app"),
  engine: engine,
  options: {
    width: width,
    height: 600,
    // showVelocity: true,
    // showPositions: true,
    // showBounds: true,
    // showAngleIndicator: true,
    // hasBounds: true,
    wireframes: false, // 关闭线框模式
    // background: "#fff",
  },
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80, {
  render: {
    sprite: {
      texture,
      xScale: 3,
      yScale: 3,
    },
  },
});
var ground = Bodies.rectangle(width / 2, 610, width, 60, {
  isStatic: true,
  chamfer: {
    radius: 30,
  },
});

// Render.lookAt(render, {
//   min: { x: 0, y: 0 },
//   max: { x: 800, y: height },
// });
var miku = await mikuBody(width / 2, 260, 2, engine, {});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, miku]);
for (let i = 0; i < engine.world.bodies.length; i++) {
  engine.world.bodies[i].plugin.wrap = {
    min: { x: render.bounds.min.x, y: render.bounds.min.y },
    max: { x: render.bounds.max.x, y: render.bounds.max.y },
  };
}

//Mouse
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
      render: {
        visible: false,
      },
    },
  });

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// function component() {
//   const p = document.createElement("p");
//   p.textContent = "hello";
//   return p;
// }

// function mount(component) {
//   document.querySelector("#app").appendChild(component);
// }

function main() {
  // mount(component());
}

main();
