import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const wireframeRef = useRef<boolean>(false);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core Geometry: Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Wireframe Cage
    const wireGeometry = new THREE.IcosahedronGeometry(1.68, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald accent
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    mainGroup.add(wireMesh);

    // Secondary Orbiting Ring
    const ringGeometry = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Sky blue
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // Second inclined ring
    const ringGeometry2 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    mainGroup.add(ringMesh2);

    // Orbiting Data Nodes (representing Database, API, Auth, 3D Engine)
    const nodeCount = 6;
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeAngles = [0, 1.05, 2.1, 3.14, 4.2, 5.25];
    const nodeColors = [0x10b981, 0x06b6d4, 0x3b82f6, 0xa855f7, 0xf59e0b, 0x10b981];

    for (let i = 0; i < nodeCount; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      mainGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // Particle Swarm
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 2.0);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate group
      mainGroup.rotation.y += isRotating ? 0.006 : 0.001;
      mainGroup.rotation.x = mouseY * 0.5 + Math.sin(elapsedTime * 0.4) * 0.1;
      mainGroup.rotation.z = mouseX * 0.3;

      // Animate rings
      ringMesh.rotation.z = elapsedTime * 0.3;
      ringMesh2.rotation.z = -elapsedTime * 0.25;

      // Animate Orbiting Nodes
      nodeMeshes.forEach((mesh, index) => {
        const angle = nodeAngles[index] + elapsedTime * 0.5;
        const radius = index % 2 === 0 ? 2.4 : 2.8;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.y = Math.sin(angle * 1.2) * (radius * 0.45);
        mesh.position.z = Math.sin(angle) * radius;
      });

      // Update wireframe mode
      coreMaterial.wireframe = wireframeRef.current;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      // Cleanup
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive, isRotating]);

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[480px]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Scene Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 px-3.5 py-2 rounded-xl pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-300">Three.js 3D Engine Active</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span className="hidden sm:inline text-slate-400">Drag mouse to tilt & inspect</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWireframeMode(!wireframeMode)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            {wireframeMode ? 'Solid Mesh' : 'Wireframe'}
          </button>
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            {isRotating ? 'Pause Orbit' : 'Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};
