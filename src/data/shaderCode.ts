// Custom GLSL Shaders for React Three Fiber WebGL Scenes

export const GlassShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      // Gentle subtle vertex wave distortion for fluid glass feel
      pos.x += sin(pos.y * 2.0 + uTime * 0.8) * 0.04;
      pos.z += cos(pos.x * 2.0 + uTime * 0.8) * 0.04;
      
      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,

  fragmentShader: `
    uniform vec3 uCameraPosition;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform vec3 uBaseColor;
    
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vec3 viewVector = normalize(uCameraPosition - vWorldPosition);
      
      // Fresnel effect for specular luxury rim light
      float fresnel = pow(1.0 - max(0.0, dot(viewVector, vNormal)), 3.0);
      
      // Warm luxury cream/bronze light reflection
      vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0, 3.0));
      float diff = max(0.0, dot(vNormal, lightDir));
      
      // Specular highlight
      vec3 halfVector = normalize(lightDir + viewVector);
      float spec = pow(max(0.0, dot(vNormal, halfVector)), 32.0);
      
      vec3 baseCream = vec3(0.98, 0.96, 0.93);
      vec3 bronzeAccent = vec3(0.78, 0.49, 0.27);
      
      vec3 finalColor = mix(baseCream, bronzeAccent, fresnel * 0.7);
      finalColor += vec3(diff * 0.15) + vec3(spec * 0.6);
      
      float alpha = 0.7 + fresnel * 0.25;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export const MorphNoiseShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;

    // Simplex Noise 3D implementation
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalMatrix * normal;
      
      float noise = snoise(position * 1.5 + vec3(uTime * 0.4));
      vDisplacement = noise;

      vec3 newPosition = position + normal * noise * 0.25;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;
    uniform vec3 uColorA; // Warm cream
    uniform vec3 uColorB; // Bronze

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
      float diff = max(0.0, dot(normal, lightDir));
      
      vec3 color = mix(uColorA, uColorB, vDisplacement * 0.5 + 0.5);
      color += vec3(diff * 0.2);
      
      gl_FragColor = vec4(color, 0.9);
    }
  `
};
