"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { DocsConfig } from "@/docs.config";
import { useMounted } from "@/lib/use-mounted";

/**
 * Static grain gradient drawn with WebGL: three colors laid along a soft
 * diagonal, broken up by cloudy patches and finished with film grain.
 *
 * The image is drawn once per size or prop change; nothing animates, so there
 * is no render loop. Without WebGL the CSS gradient on the wrapper shows
 * instead.
 */

type Hex = `#${string}`;

export type GrainGradientProps = {
  /** Lightest color, used for the brightest patches. */
  highlight: Hex;
  /** Main color, covering most of the area. */
  body: Hex;
  /** Darkest color, used for the shadows and cloud cores. */
  shadow: Hex;
  /** How far the colors spread toward highlight and shadow. 1 is flat, default 1.5. */
  contrast?: number;
  /** 0 is greyscale, 1 keeps the colors, above 1 boosts them. */
  saturation?: number;
  /** Strength of the cloudy patches. 0 gives smooth bands. */
  clouds?: number;
  /** Cloud size: higher means smaller, busier clouds. */
  cloudScale?: number;
  /** Picks a different cloud pattern. */
  seed?: number;
  /** Grain strength, 0 to about 0.2. */
  grain?: number;
  className?: string;
};

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;

uniform vec2 uSize;
uniform float uPixel;
uniform vec3 uHighlight;
uniform vec3 uBody;
uniform vec3 uShadow;
uniform float uContrast;
uniform float uSaturation;
uniform float uClouds;
uniform float uCloudScale;
uniform float uSeed;
uniform float uGrain;

// Integer-lattice hash in [0, 1).
float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

// Bilinear value noise with a quintic fade.
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

// Five octaves, each rotated so the lattice never lines up. A lower gain
// keeps less fine detail, which reads as softer, rounder shapes. The result is
// normalised back to roughly [0, 1].
float fbm(vec2 p, float gain) {
  mat2 turn = mat2(0.80, 0.60, -0.60, 0.80);
  float sum = 0.0;
  float amp = 1.0;
  float total = 0.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    total += amp;
    p = turn * p * 2.02 + vec2(11.7, 5.3);
    amp *= gain;
  }
  return sum / total;
}

vec3 ramp(float t) {
  vec3 low = mix(uShadow, uBody, smoothstep(0.0, 0.5, t));
  return mix(low, uHighlight, smoothstep(0.5, 1.0, t));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uSize;
  float aspect = uSize.x / uSize.y;
  // Height-normalised space, so features keep their shape on wide headers.
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 offset = vec2(uSeed * 17.13, uSeed * 7.91);

  // Large, slow warp shared by the bands and the clouds.
  vec2 warp = vec2(
    fbm(p * 0.7 + offset, 0.5),
    fbm(p * 0.7 + offset + vec2(4.1, 9.7), 0.5)
  ) - 0.5;

  // Base: a soft left-to-right rise from body toward highlight.
  float t = 0.50 + 0.34 * uv.x + 0.06 * uv.y + warp.x * 0.30;
  // A broad glow toward the right edge.
  t += 0.12 * smoothstep(0.55, 1.0, uv.x);

  // Clouds: soft blobs (low gain), gently bent by the warp so they billow
  // instead of streaking. The fine-gain layer adds a little texture to the
  // edges.
  float soft = fbm(p * uCloudScale * 0.75 + warp * 0.9 + offset + 3.3, 0.38);
  float edge = fbm(p * uCloudScale * 2.0 + offset + 8.1, 0.55);
  float cloud = (soft - 0.5) * 1.6 + (edge - 0.5) * 0.35;
  t += cloud * uClouds * 0.68;

  vec3 color = ramp(clamp(t, 0.0, 1.0));

  // Contrast around mid-grey. On warm colors this also deepens saturation,
  // which is what gives the header its glow.
  color = (color - 0.5) * uContrast + 0.5;

  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(luma), color, uSaturation);

  // Grain on a CSS-pixel grid, so it looks the same on every screen density.
  float g = hash(floor(gl_FragCoord.xy / uPixel) + offset * 31.0) - 0.5;
  color += g * uGrain;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function toRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
  }
  return shader;
}

export function GrainGradient({
  highlight,
  body,
  shadow,
  contrast = 1.5,
  saturation = 1,
  clouds = 0,
  cloudScale = 1.6,
  seed = 0,
  grain = 0.1,
  className,
}: GrainGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !gl) return;

    // The canvas keeps one context for its whole life (getContext returns the
    // same one on every call), so each run builds its own program and buffer
    // and the cleanup deletes them. Losing the context instead would break
    // the next run, e.g. React's development double-invoke or a theme change.
    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      // Leave the CSS fallback visible.
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the whole viewport.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform3fv(u("uHighlight"), toRgb(highlight));
    gl.uniform3fv(u("uBody"), toRgb(body));
    gl.uniform3fv(u("uShadow"), toRgb(shadow));
    gl.uniform1f(u("uContrast"), contrast);
    gl.uniform1f(u("uSaturation"), saturation);
    gl.uniform1f(u("uClouds"), clouds);
    gl.uniform1f(u("uCloudScale"), cloudScale);
    gl.uniform1f(u("uSeed"), seed);
    gl.uniform1f(u("uGrain"), grain);

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u("uSize"), w, h);
      gl.uniform1f(u("uPixel"), dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      gl.deleteBuffer(buffer);
      for (const shader of gl.getAttachedShaders(program) ?? []) gl.deleteShader(shader);
      gl.deleteProgram(program);
    };
  }, [highlight, body, shadow, contrast, saturation, clouds, cloudScale, seed, grain]);

  return (
    <div
      className={className}
      style={{ background: `linear-gradient(120deg, ${shadow}, ${body} 45%, ${highlight})` }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" style={{ opacity: 0 }} />
    </div>
  );
}

type GradientConfig = DocsConfig["theme"]["grainient"];

/**
 * GrainGradient driven by docs.config.ts's theme.grainient. The `dark` block
 * is layered over the base values once the resolved theme is dark; until the
 * theme is known (server render and hydration) the light values are used, so
 * the markup matches.
 */
export function ThemedGrainGradient({
  config,
  className,
}: {
  config: GradientConfig;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const c = mounted && resolvedTheme === "dark" ? { ...config, ...config.dark } : config;

  return (
    <GrainGradient
      className={className}
      highlight={c.color1}
      body={c.color2}
      shadow={c.color3}
      contrast={c.contrast}
      saturation={config.saturation}
      clouds={config.clouds?.amount}
      cloudScale={config.clouds?.scale}
      seed={config.clouds?.seed}
    />
  );
}
