
let canvas;
let shellColor, paperColor, inkColor;
let spotSlider, sizeSlider, rotationSlider, grainSlider;
let texture;
let surpriseButton, exportButton;

let shellLabel, spotLabel, sizeLabel, rotationLabel, grainLabel;

function setup() {
  let page = createDiv();
  page.style("display", "flex");
  page.style("flex-wrap", "wrap");
  page.style("gap", "24px");
  page.style("padding", "24px");
  page.style("background", "#171816");
  page.style("font-family", "Courier New");
  page.style("color", "#eee5ce");
  page.style("align-items", "flex-start");

  // CONTROL PANEL
  let panel = createDiv();
  panel.parent(page);
  panel.style("width", "245px");
  panel.style("padding", "12px");

  let title = createElement("h1", "LADYBUG LAB");
  title.parent(panel);
  title.style("font-family", "Georgia");
  title.style("font-size", "30px");
  title.style("letter-spacing", "2px");
  title.style("color", "#eee5ce");
  title.style("border-bottom", "3px solid #eee5ce");
  title.style("padding-bottom", "12px");

  createLabel("SHELL COLOR", panel);
  shellColor = createColorPicker("#d9362b");
  stylePicker(shellColor);

  createLabel("BACKGROUND COLOR", panel);
  paperColor = createColorPicker("#e9e1ca");
  stylePicker(paperColor);

  createLabel("INK COLOR", panel);
  inkColor = createColorPicker("#171816");
  stylePicker(inkColor);

  createLabel("NUMBER OF SPOTS", panel);
  spotSlider = createSlider(2, 12, 7, 1);
  styleSlider(spotSlider);

  createLabel("LADYBUG SIZE", panel);
  sizeSlider = createSlider(75, 120, 100, 1);
  styleSlider(sizeSlider);

  createLabel("ROTATION", panel);
  rotationSlider = createSlider(-25, 25, 0, 1);
  styleSlider(rotationSlider);

  createLabel("GRAIN / DISTRESS", panel);
  grainSlider = createSlider(0, 100, 65, 1);
  styleSlider(grainSlider);

  surpriseButton = createButton("SURPRISE ME");
  surpriseButton.parent(panel);
  styleButton(surpriseButton);
  surpriseButton.mousePressed(randomize);

  exportButton = createButton("DOWNLOAD STICKER");
  exportButton.parent(panel);
  styleButton(exportButton);
  exportButton.mousePressed(() => {
    saveCanvas(canvas, "vintage-ladybug", "png");
  });

  // ARTWORK PREVIEW
  let preview = createDiv();
  preview.parent(page);
  preview.style("margin-top", "5px");

  canvas = createCanvas(560, 620);
  canvas.parent(preview);

  texture = createGraphics(560, 620);
  makeTexture();
}

function createLabel(words, parent) {
  let p = createP(words);
  p.parent(parent);
  p.style("font-size", "13px");
  p.style("font-weight", "bold");
  p.style("letter-spacing", "1px");
  p.style("margin-top", "22px");
  p.style("margin-bottom", "7px");
  p.style("color", "#eee5ce");
}

function stylePicker(picker) {
  picker.style("width", "100%");
  picker.style("height", "35px");
  picker.style("border", "2px solid #eee5ce");
  picker.style("background", "#eee5ce");
}

function styleSlider(slider) {
  slider.style("width", "100%");
  slider.style("accent-color", "#d9362b");
}

function styleButton(button) {
  button.style("display", "block");
  button.style("width", "100%");
  button.style("padding", "13px");
  button.style("margin-top", "22px");
  button.style("background", "#e9e1ca");
  button.style("color", "#171816");
  button.style("border", "none");
  button.style("font-family", "Courier New");
  button.style("font-weight", "bold");
  button.style("font-size", "13px");
  button.style("letter-spacing", "1px");
  button.style("cursor", "pointer");
}

// CREATE PAPER GRAIN
function makeTexture() {
  texture.clear();
  randomSeed(42);

  // Tiny ink speckles
  for (let i = 0; i < 26000; i++) {
    let x = random(width);
    let y = random(height);
    let s = random(0.5, 2.5);

    texture.noStroke();
    texture.fill(10, 8, 5, random(15, 90));
    texture.circle(x, y, s);
  }

  // Paper scratches
  for (let i = 0; i < 250; i++) {
    let x = random(width);
    let y = random(height);

    texture.stroke(245, 230, 195, random(15, 65));
    texture.strokeWeight(random(0.3, 1));
    texture.line(x, y, x + random(-8, 8), y + random(2, 15));
  }

  // Larger distressed marks
  for (let i = 0; i < 400; i++) {
    texture.noStroke();
    texture.fill(15, 12, 8, random(10, 55));
    texture.circle(random(width), random(height), random(1, 5));
  }

  randomSeed();
}

function draw() {
  background("#171816");

  // Vintage poster border
  noFill();
  stroke("#e9e1ca");
  strokeWeight(1);
  rect(12, 12, 536, 596);

  // Top specimen label
  noStroke();
  fill(paperColor.value());
  rect(355, 30, 170, 28);

  fill(inkColor.value());
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text("PN-62/D-94061", 440, 44);

  // Main cream circle
  noStroke();
  fill(paperColor.value());
  circle(280, 300, 445);

  // Ladybug
  push();
  translate(280, 310);
  rotate(rotationSlider.value());
  scale(sizeSlider.value() / 100);

  drawLadybug();

  pop();

  // Bottom specimen label
  fill(paperColor.value());
  rect(45, 565, 470, 27);

  fill(inkColor.value());
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text("69 ZPL  SIANOW PRZEC. 64 ZAP. 50 GR", 280, 578);

  // GRAIN OVERLAY
  // The slider controls how visible the grain appears.
  push();
  tint(255, grainSlider.value() * 2.55);
  blendMode(MULTIPLY);
  image(texture, 0, 0);
  pop();
}

function drawLadybug() {
  let red = shellColor.value();
  let black = inkColor.value();

  noStroke();

  // Angular legs behind the body
  fill(black);

  triangle(-65, -35, -115, -95, -120, -45);
  triangle(-80, 5, -130, 0, -120, 35);
  triangle(-65, 80, -115, 140, -105, 95);

  triangle(65, -35, 115, -95, 120, -45);
  triangle(80, 5, 130, 0, 120, 35);
  triangle(65, 80, 115, 140, 105, 95);

  // Antennae
  noFill();
  stroke(black);
  strokeWeight(7);

  beginShape();
  vertex(-25, -120);
  bezierVertex(-75, -150, -85, -205, -65, -220);
  endShape();

  beginShape();
  vertex(25, -120);
  bezierVertex(75, -150, 85, -205, 65, -220);
  endShape();

  noStroke();
  fill(black);
  circle(-65, -220, 24);
  circle(65, -220, 24);

  // Head
  ellipse(0, -105, 115, 85);

  // Neck details
  fill(red);
  circle(-40, -135, 23);
  circle(40, -135, 23);

  // Left wing
  fill(red);
  beginShape();
  vertex(0, -100);
  bezierVertex(-70, -125, -135, -75, -140, 10);
  bezierVertex(-145, 105, -90, 175, -10, 180);
  vertex(0, -100);
  endShape(CLOSE);

  // Right wing
  beginShape();
  vertex(0, -100);
  bezierVertex(70, -125, 135, -75, 140, 10);
  bezierVertex(145, 105, 90, 175, 10, 180);
  vertex(0, -100);
  endShape(CLOSE);

  // Black center division
  fill(black);
  beginShape();
  vertex(-8, -95);
  vertex(0, -100);
  vertex(8, 180);
  vertex(-10, 180);
  vertex(-18, 100);
  endShape(CLOSE);

  // Spots
  let positions = [
    [-75, -65],
    [-20, -65],
    [75, -65],
    [65, -5],
    [-85, 5],
    [-65, 75],
    [65, 90],
    [25, 45],
    [-25, 120],
    [90, 50],
    [-100, -5],
    [0, 135]
  ];

  fill(black);
  noStroke();

  for (let i = 0; i < spotSlider.value(); i++) {
    let x = positions[i][0];
    let y = positions[i][1];

    circle(x, y, 35);
  }

  // Slightly imperfect ink marks
  stroke(black);
  strokeWeight(2);
  line(-130, 25, -128, 40);
  line(128, 70, 130, 85);
}

// RANDOMIZED DESIGN
function randomize() {
  shellColor.value(random([
    "#d9362b",
    "#c43b30",
    "#e24b37",
    "#b92d27",
    "#d65a42"
  ]));

  paperColor.value(random([
    "#e9e1ca",
    "#ded5bb",
    "#f0e7d2",
    "#d8d0b9"
  ]));

  inkColor.value(random([
    "#171816",
    "#25221e",
    "#302b26"
  ]));

  spotSlider.value(floor(random(3, 13)));
  sizeSlider.value(floor(random(80, 116)));
  rotationSlider.value(floor(random(-20, 21)));
  grainSlider.value(floor(random(40, 101)));
}
