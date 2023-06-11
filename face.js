var DEBUG_MODE = false ;

var NUM_SLIDERS = 5;

function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions,x, y, radius1, radius2, npoints) {
    this.starColour = color('#FBE174');
    this.starShadowColour = color('#E5C172');
    
    this.eyeColour = color(255)
    this.pupilColour = color(60)
    this.left_eye_pos = segment_average(positions.left_eye);
    this.right_eye_pos = segment_average(positions.right_eye);
    this.nose_pos = positions.nose_bridge[1];

    if(this.direction == 0){
      this.pupil_shift = -0.2;
    } else if(this.direction == 1){
      this.pupil_shift = -0.1;
    } else if(this.direction == 2){
      this.pupil_shift = 0
    } else if(this.direction == 3){
      this.pupil_shift = 0.1;
    } else {
      this.pupil_shift = 0.2
    }

    if(this.hair == 0){
      this.noseColour = color('#EEC6CA');
      this.noseShadowColour = color('#E3A1A7');
    } else if(this.hair == 1){
      this.noseColour = color('#70A288');
      this.noseShadowColour = color('#61947A');
    } else if(this.hair == 2){
      this.noseColour = color('#0A81D6'); 
      this.noseShadowColour = color('#0A64EB'); 
    } else if(this.hair == 3){
      this.noseColour = color('#B5404D');
      this.noseShadowColour = color('#B71528');
    } else {
      this.noseColour = color('#F19455');
      this.noseShadowColour = color('#E26612');
    }

    noStroke();
    fill(this.starColour);
      this.star(0,-0.5,1.9,2.1,25);

    fill(this.starShadowColour);
      ellipse(this.right_eye_pos[0]+0.05, this.right_eye_pos[1]+0.05,1);
      ellipse(this.left_eye_pos[0]+0.05, this.left_eye_pos[1]+0.05,1);

    push();
    rotate(this.noseTilt);
      ellipse(this.nose_pos[0]+0.05,this.nose_pos[1]+0.05,0.8);
      ellipse(this.nose_pos[0]+0.05,this.nose_pos[1]+0.05+this.noseLength,0.8);
      rect(this.nose_pos[0]-0.4+0.05,this.nose_pos[1]+0.05,0.8,0+this.noseLength);
    pop();

    fill(this.eyeColour);
      ellipse(this.right_eye_pos[0], this.right_eye_pos[1],1);
    fill(this.pupilColour);
      ellipse(this.right_eye_pos[0]+this.pupil_shift, this.right_eye_pos[1],0.4,0.6);

    fill(this.eyeColour);
      ellipse(this.left_eye_pos[0], this.left_eye_pos[1],1)  
    fill(this.pupilColour);
      ellipse(this.left_eye_pos[0]+this.pupil_shift, this.left_eye_pos[1],0.4,0.6);

    if (this.squinting < 1){

    } else {
      fill(this.noseColour);
        arc(this.left_eye_pos[0], this.left_eye_pos[1],1,1,180,0,CHORD);
        arc(this.right_eye_pos[0], this.right_eye_pos[1],1,1,180,0,CHORD);

      fill(this.noseShadowColour);
      beginShape();
        curveVertex(this.left_eye_pos[0]+0.0,this.left_eye_pos[1]+1.5);
        curveVertex(this.left_eye_pos[0]+0.3,this.left_eye_pos[1]+0.0);
        curveVertex(this.left_eye_pos[0]-0.0,this.left_eye_pos[1]-0.495);
        curveVertex(this.left_eye_pos[0]+0.5,this.left_eye_pos[1]+0.0);
        curveVertex(this.left_eye_pos[0]+0.1,this.left_eye_pos[1]+2.3);
      endShape();

      beginShape();
      curveVertex(this.right_eye_pos[0]+0.0,this.right_eye_pos[1]+1.5);
      curveVertex(this.right_eye_pos[0]+0.3,this.right_eye_pos[1]+0.0);
      curveVertex(this.right_eye_pos[0]-0.0,this.right_eye_pos[1]-0.495);
      curveVertex(this.right_eye_pos[0]+0.5,this.right_eye_pos[1]+0.0);
      curveVertex(this.right_eye_pos[0]+0.1,this.right_eye_pos[1]+2.3);
    endShape();
    }

    push();
    rotate(this.noseTilt);
    fill(this.noseColour);
      ellipse(this.nose_pos[0],this.nose_pos[1],0.8);
      ellipse(this.nose_pos[0],this.nose_pos[1]+this.noseLength,0.8);
      rect(this.nose_pos[0]-0.4,this.nose_pos[1],0.8,0+this.noseLength);

    fill(this.noseShadowColour);      
      rect(this.nose_pos[0]+0.2,this.nose_pos[1],0.2,0+this.noseLength);
      beginShape();
        curveVertex(this.nose_pos[0]+0.0,this.nose_pos[1]-1.5+this.noseLength);
        curveVertex(this.nose_pos[0]+0.2,this.nose_pos[1]-0.01+this.noseLength);
        curveVertex(this.nose_pos[0]+0.0,this.nose_pos[1]+0.395+this.noseLength);
        curveVertex(this.nose_pos[0]+0.4,this.nose_pos[1]-0.01+this.noseLength);
        curveVertex(this.nose_pos[0]+0.0,this.nose_pos[1]-2.0+this.noseLength);
      endShape();

      beginShape();
        curveVertex(this.nose_pos[0]+0.1,this.nose_pos[1]+1.4);
        curveVertex(this.nose_pos[0]+0.2,this.nose_pos[1]+0.01);
        curveVertex(this.nose_pos[0]-0.0,this.nose_pos[1]-0.395);
        curveVertex(this.nose_pos[0]+0.4,this.nose_pos[1]+0.01);
        curveVertex(this.nose_pos[0]+0.1,this.nose_pos[1]+2.0);
      endShape();
    pop();
  }

  this.star = function(x, y, radius1, radius2, npoints) {
    let angle = 360 / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  this.setProperties = function(settings) {
    this.noseLength = map(settings[0], 0, 100, 0.1, 1);
    this.direction = int(map(settings[1], 0, 100, 0, 4));
    this.noseTilt = map(settings[2], 0, 100, -15, 15);
    this.hair = int(map(settings[3], 0, 100, 0, 4));
    this.squinting = int(map(settings[4], 0, 100, 0, 2));
  }

  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.noseLength, 0.1, 1, 0, 100);
    settings[1] = int(map(this.direction, 0, 4, 0, 100));
    settings[2] = map(this.noseTilt, -15, 15, 0, 100);
    settings[3] = int(map(this.hair, 0, 4, 0, 100));
    settings[4] = int(map(this.squinting, 0, 2, 0, 100));
    return settings;
  }
}