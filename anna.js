var vertCode =
  "attribute vec3 coordinates;" +
  "void main(void) {" +
  " gl_Position = vec4(coordinates, 1.0);" +
  "gl_PointSize = 10.0;" +
  "}";
var fragCode = "void main() {" + " gl_FragColor = vec4(0.5, 0.4, 0, 1);" + "}";

//

function webGL() {
  console.log("test1");
  /*================Creating a canvas=================*/
  canvas = document.getElementById("game-surface");
  var gl = canvas.getContext("webgl"); //this is how we try to run webgl on the canvas

  if (!gl) {
    gl = canvas.getContext("experimental-webgl");
    console.log("You have an experimental version of webgl running!");
  } else {
    //else, it will have worked.
    console.log("Regular version of WebGL up and running!");
  }
  if (!gl) {
    //this wouold be a huge issue, so we make it an alert, not just a log.
    alert("Your browser does not support WebGL!");
  }
  //
  /*==============================================*/
  //
  //gl.clearColor(0.0, 0.0, 0.0, 0.0); //this is the syntax:
  //void glClearColor(red,green,blue,alpha); (opacity): all must be in range [0,1]
  //gl.clear(gl.COLOR_BUFFER_BIT); //gl.COLOR_BUFFER_BIT = gl.clearColor
  //

  var vertices = [-0.5, 0.0, 0.0, 0.0, 0.5, 0.0, -0.25, 0.25, 0.0];
  //
  //Now we must set up the "buffers"
  //Note that they are defined as such:
  //a contiguous block of memory in the GPU that stores rendering data for a model.
  //For WebGL, a buffer object is ALWAYS a 1D array of floats.
  var vertex_buffer = gl.createBuffer();
  //Bind appropriate array buffer to it
  //steps will be:
  //    -> bind the gl.ARRAY_BUFFER onto our designated memory to draw the dots
  //    -> draw the dots
  //    -> unbind the buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Pass the vertex data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //this passes the vertices (Float32Array typed array->an array of 32-bit floating point
  //numbers) into the FIRST operand (gl.ARRAY_BUFFER), and the final var is "usage"
  //    -> static draw = "intended to be specified ONCE by application, then used
  //       many times as the source for WebGL drawing. (NOT dynamic)
  //here are the different types:
  // src: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferData
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Create a vertex shader object we will:
  //    -> define the variable as its type
  //    -> attatch it to our source code
  //    -> compile it as a shader
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  // Create fragment shader object
  //    -> we will do the same thing. (same steps)
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);

  // Create a shader program object to store
  // the combined shader program

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  //

  /*======== Associating shaders to buffer objects ========*/

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Get the attribute location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  //

  /*============= Drawing the primitive ===============*/

  // Clear the canvas
  gl.clearColor(0.1, 0.5, 0.5, 0.5); //<-- canvas color

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Draw the points
  gl.drawArrays(gl.POINTS, 0, 3);
}
//
//
function randAgain() {
  var weight = document.getElementById("myConcentration").value;
  var myVeryOwnFragCode =
    "void main(void) {" +
    " gl_FragColor = vec4(" +
    Math.random() +
    ", " +
    Math.random() +
    ", " +
    Math.random() +
    ", 1);" +
    "}";

  //console.log("you've reached random!");
  /*================Creating a canvas=================*/
  canvas = document.getElementById("game-surface");
  var gl = canvas.getContext("webgl"); //this is how we try to run webgl on the canvas
  vertices = [];
  //
  for (i = 0; i < 3; i++) {
    vertices.push(((Math.random() * 2 - 1) * weight) / 100);
    vertices.push(((Math.random() * 2 - 1) * weight) / 100);
    vertices.push(0.0);
  }
  console.log(vertices);

  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, myVeryOwnFragCode);
  gl.compileShader(fragShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  /*======== Associating shaders to buffer objects ========*/

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Get the attribute location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  //

  /*============= Drawing the primitive ===============*/

  // Clear the canvas
  gl.clearColor(0.1, 0.5, 0.5, 0.5); //<-- canvas color

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Draw the points
  gl.drawArrays(gl.POINTS, 0, 3);
}
