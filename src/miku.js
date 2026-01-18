import Matter from "matter-js";
var Body = Matter.Body,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Composite = Matter.Composite,
  Common = Matter.Common,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices,
  Events = Matter.Events;

var group = Body.nextGroup(true);
var select = function (root, selector) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadSvg = async function (url) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    });
};

var loadBody = async function (path, x, y, scale) {
  return loadSvg(path).then((root) => {
    var vertexSets = select(root, "path").map(function (path) {
      return Vertices.scale(Svg.pathToVertices(path, 120), scale, scale);
    });

    let v = Bodies.fromVertices(
      x,
      y,
      vertexSets,
      {
        render: {
          sprite: {
            texture: path,
            xScale: scale,
            yScale: scale,
            single: true,
          },
        },
        collisionFilter: {
          group: group,
        },
      },
      false
    );
    return v;
  });
};

// var ce_fa_r = "/CeFaR.svg",
//   ce_fa_l = "/CeFaL.svg",
//   shou_bi_l = "ShouBiL.svg",
//   shou_bi_r = "ShouBiR.svg",
//   lin_dai = "LinDai.svg",
//   tou_shi_l = "TouShiL.svg",
//   tou_shi_r = "TouShiR.svg",
//   lin_zi = "LinZi.svg",
//   bei_fa = "BeiFa.svg",
//   nian = "Nian.svg",
//   shen_ti = "ShenTi.svg",
//   qun_zi = "Qunzi.svg",
//   qian_fa = "QianFa.svg",
//   tui_r = "TuiR.svg",
//   tui_l = "TuiL.svg";

export default async function (x, y, scale,engine, options) {
  var nian = await loadBody("/Nian.svg", x, y - 50 * scale, scale);
  var shen_ti = await loadBody("/ShenTi.svg", x, y, scale);
  var qian_fa = await loadBody("QianFa.svg", x, y, scale);
  var lin_zi = await loadBody("LinZi.svg", x, y - 4.5 * scale, scale);

  var lin_dai = await loadBody("LinDai.svg", x, y + 36 * scale, scale);
  // Events.on(engine,"beforeUpdate", function (event) {
  //   lin_dai.angle =
  //     lin_dai.angle > 0
  //       ? Math.min(lin_dai.angle, 1)
  //       : Math.max(lin_dai.angle, -1);
  // });

  var ce_fa_l = await loadBody(
    "/CeFaL.svg",
    x - 35 * scale,
    y + 35 * scale,
    scale
  );
  var ce_fa_r = await loadBody(
    "/CeFaR.svg",
    x + 35 * scale,
    y + 35 * scale,
    scale
  );
  var tou_shi_l = await loadBody(
    "TouShiL.svg",
    x - 27 * scale,
    y - 50 * scale,
    scale
  );
  var tou_shi_r = await loadBody(
    "TouShiR.svg",
    x + 27 * scale,
    y - 50 * scale,
    scale
  );
  var shou_bi_l = await loadBody(
    "ShouBiL.svg",
    x - 19 * scale,
    y + 51 * scale,
    scale
  );
  var shou_bi_r = await loadBody(
    "ShouBiR.svg",
    x + 19 * scale,
    y + 51 * scale,
    scale
  );

  var qun_zi = await loadBody("Qunzi.svg", x, y + 78 * scale, scale);
  var tui_l = await loadBody(
    "TuiL.svg",
    x - 11 * scale,
    y + 142 * scale,
    scale
  );
  var tui_r = await loadBody(
    "TuiR.svg",
    x + 11 * scale,
    y + 142 * scale,
    scale
  );
  var bei_fa = await loadBody(
    "BeiFa.svg",
    x - 2 * scale,
    y - 15 * scale,
    scale
  );

  var shenTiToNian = Constraint.create({
    bodyA: nian,
    pointA: {
      x: 0,
      y: 25 * scale,
    },
    length: 0,
    pointB: {
      x: 0,
      y: -48 * scale,
    },
    bodyB: shen_ti,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  //shenTiToNian1&shenTiToNian2用于撑起头部
  var shenTiToNian1 = Constraint.create({
    bodyA: nian,
    pointA: {
      x: -10 * scale,
      y: 25 * scale,
    },
    length: 9 * scale,
    pointB: {
      x: -10 * scale,
      y: -40 * scale,
    },
    bodyB: shen_ti,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  var shenTiToNian2 = Constraint.create({
    bodyA: nian,
    pointA: {
      x: 10 * scale,
      y: 25 * scale,
    },
    length: 9 * scale,
    pointB: {
      x: 10 * scale,
      y: -40 * scale,
    },
    bodyB: shen_ti,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  var QianFaToNian = Constraint.create({
    bodyA: nian,
    pointA: {
      x: 0,
      y: -10 * scale,
    },
    length: 0,
    pointB: {
      x: 0,
      y: 0,
    },
    bodyB: qian_fa,
    stiffness: 0.9,
    render: {
      visible: false,
    },
  });
  var QianFaToNian1 = Constraint.create({
    bodyA: nian,
    pointA: {
      x: 0,
      y: 10 * scale,
    },
    length: 0,
    pointB: {
      x: 0,
      y: 20 * scale,
    },
    bodyB: qian_fa,
    stiffness: 0.9,
    render: {
      visible: false,
    },
  });
  var LinZiToShenTi = Constraint.create({
    bodyA: shen_ti,
    pointA: {
      x: -5 * scale,
      y: -38.5 * scale,
    },
    pointB: {
      x: -5 * scale,
      y: 0,
    },
    bodyB: lin_zi,
    length: 0,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  var LinZiToShenTi1 = Constraint.create({
    bodyA: shen_ti,
    pointA: {
      x: 5 * scale,
      y: -38.5 * scale,
    },
    pointB: {
      x: 5 * scale,
      y: 0,
    },
    bodyB: lin_zi,
    length: 0,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  var LinDaiToShenTo = Constraint.create({
    bodyA: lin_dai,
    pointA: {
      x: 0,
      y: -44 * scale,
    },
    angleAStiffness: 1,
    angleAMin: -0.5,
    angleAMax: 0.5,
    pointB: {
      x: 0,
      y: -40 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.1,
    render: {
      visible: false,
    },
  });
  var CeFaLToQianFa = Constraint.create({
    bodyA: ce_fa_l,
    pointA: {
      x: 6 * scale,
      y: -99 * scale,
    },
    pointB: {
      x: -25 * scale,
      y: -16 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  var CeFaRToQianFa = Constraint.create({
    bodyA: ce_fa_r,
    pointA: {
      x: -6 * scale,
      y: -99 * scale,
    },
    pointB: {
      x: 25 * scale,
      y: -16 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  var touShiLToQianFa = Constraint.create({
    bodyA: tou_shi_l,
    pointA: {
      x: -2 * scale,
      y: -10 * scale,
    },
    pointB: {
      x: -25 * scale,
      y: -16 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.3,
    render: {
      visible: false,
    },
  });
  var touShiLToQianFa1 = Constraint.create({
    bodyA: tou_shi_l,
    pointA: {
      x: 0,
      y: 10 * scale,
    },
    pointB: {
      x: -29 * scale,
      y: 6 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.3,
    render: {
      visible: false,
    },
  });
  var touShiRToQianFa = Constraint.create({
    bodyA: tou_shi_r,
    pointA: {
      x: 2 * scale,
      y: -10 * scale,
    },
    pointB: {
      x: 25 * scale,
      y: -16 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.3,
    render: {
      visible: false,
    },
  });
  var touShiRToQianFa1 = Constraint.create({
    bodyA: tou_shi_r,
    pointA: {
      x: 0,
      y: 10 * scale,
    },
    pointB: {
      x: 29 * scale,
      y: 6 * scale,
    },
    bodyB: qian_fa,
    length: 0,
    stiffness: 0.3,
    render: {
      visible: false,
    },
  });

  var shouBiLToShenTi = Constraint.create({
    bodyA: shou_bi_l,
    pointA: {
      x: 6 * scale,
      y: -49 * scale,
    },
    pointB: {
      x: -12 * scale,
      y: -33 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.1,
    render: {
      visible: false,
    },
  });
  var shouBiRLToShenTi = Constraint.create({
    bodyA: shou_bi_r,
    pointA: {
      x: -6 * scale,
      y: -49 * scale,
    },
    pointB: {
      x: 12 * scale,
      y: -33 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.1,
    render: {
      visible: false,
    },
  });
  var qunZiToShenTi = Constraint.create({
    bodyA: qun_zi,
    pointA: {
      x: -10 * scale,
      y: 0,
    },
    pointB: {
      x: -10 * scale,
      y: 42 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.1,
    render: {
      visible: false,
    },
  });
  var qunZiToShenTi1 = Constraint.create({
    bodyA: qun_zi,
    pointA: {
      x: 10 * scale,
      y: 0,
    },
    pointB: {
      x: 10 * scale,
      y: 42 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 1,
    render: {
      visible: false,
    },
  });
  var tuiLToShenTi = Constraint.create({
    bodyA: tui_l,
    pointA: {
      x: 0,
      y: -60 * scale,
    },
    pointB: {
      x: -11 * scale,
      y: 45 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  var tuiRToShenTi = Constraint.create({
    bodyA: tui_r,
    pointA: {
      x: 0,
      y: -60 * scale,
    },
    pointB: {
      x: 11 * scale,
      y: 45 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  //约束腿的运动
  var tuiLRToShenTi1 = Constraint.create({
    bodyA: tui_r,
    pointA: {
      x: 0,
      y: 0,
    },
    pointB: {
      x: 0,
      y: 0,
    },
    bodyB: tui_l,
    // length:30*scale,
    stiffness: 0.001,
    render: {
      visible: true,
    },
  });
  var beiFaToNian = Constraint.create({
    bodyA: bei_fa,
    pointA: {
      x: 3 * scale,
      y: 0,
    },
    pointB: {
      x: 3 * scale,
      y: -52 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  var beiFaToNian1 = Constraint.create({
    bodyA: bei_fa,
    pointA: {
      x: 0,
      y: 0,
    },
    pointB: {
      x: -2 * scale,
      y: -52 * scale,
    },
    bodyB: shen_ti,
    length: 0,
    stiffness: 0.2,
    render: {
      visible: false,
    },
  });
  var miku = Composite.create({
    bodies: [
      ce_fa_l,
      ce_fa_r,
      bei_fa,
      shou_bi_l,
      shou_bi_r,
      tui_l,
      tui_r,
      qun_zi,
      shen_ti,
      nian,
      tou_shi_l,
      tou_shi_r,
      qian_fa,
      lin_dai,
      lin_zi,
      // bei_fa,
    ],
    constraints: [
      shenTiToNian,
      shenTiToNian1,
      shenTiToNian2,
      QianFaToNian,
      QianFaToNian1,
      LinZiToShenTi,
      LinZiToShenTi1,
      LinDaiToShenTo,
      CeFaLToQianFa,
      CeFaRToQianFa,
      touShiRToQianFa,
      touShiRToQianFa1,
      touShiLToQianFa,
      touShiLToQianFa1,
      shouBiLToShenTi,
      shouBiRLToShenTi,
      qunZiToShenTi,
      qunZiToShenTi1,
      tuiLToShenTi,
      tuiRToShenTi,
      beiFaToNian,
      beiFaToNian1,
      // tuiLRToShenTi1,
    ],
  });
  return miku;
}
