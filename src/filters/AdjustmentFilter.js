import * as PIXI from "pixi.js";

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D nightTexture;
uniform float gamma;
uniform float contrast;
uniform float saturation;
uniform float brightness;
uniform float red;
uniform float green;
uniform float blue;
uniform float alpha;

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 c = color;

    if (c.a > 0.0) {
        c.rgb /= c.a;

        vec3 rgb = pow(c.rgb, vec3(1. / gamma));
        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);
        rgb.r *= red;
        rgb.g *= green;
        rgb.b *= blue;
        c.rgb = rgb * brightness;

        c.rgb *= c.a;
    }

    vec4 night = texture2D(nightTexture, vTextureCoord);

    float coeff = sqrt(night.r);
    gl_FragColor = (c * alpha) * (1.0 - coeff) + coeff * color;
    //gl_FragColor = vec4(coeff, coeff, coeff, 1.0);
}
`;

export default class AdjustmentFilter extends PIXI.Filter {
  constructor(options) {
    super(undefined, fragment);

    Object.assign(
      this,
      {
        gamma: 1,

        saturation: 1,

        contrast: 1,

        brightness: 1,

        red: 1,

        green: 1,

        blue: 1,

        alpha: 1
      },
      options
    );
  }

  apply(filterManager, input, output, clear) {
    this.uniforms.gamma = Math.max(this.gamma, 0.0001);
    this.uniforms.saturation = this.saturation;
    this.uniforms.contrast = this.contrast;
    this.uniforms.brightness = this.brightness;
    this.uniforms.red = this.red;
    this.uniforms.green = this.green;
    this.uniforms.blue = this.blue;
    this.uniforms.alpha = this.alpha;

    filterManager.applyFilter(this, input, output, clear);
  }
}
