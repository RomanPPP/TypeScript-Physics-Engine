var vert = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec4 a_normal;
layout(location = 2) in vec2 a_texcoord;


// A matrix to transform the positions by
uniform mat4 u_matrix;
uniform mat4 u_worldViewProjection;
uniform mat2 u_texScale;
uniform vec2 u_texOffset;
// a varying to pass the texture coordinates to the fragment shader
out vec2 v_texcoord;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = u_worldViewProjection * a_position;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;

var frag = `#version 300 es

precision highp float;

// Passed in from the vertex shader.
in vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  vec4 color0 = texture(u_texture, v_texcoord);

  outColor = color0;
  if(outColor.a < 0.1) discard;
}
`;

export {vert, frag}