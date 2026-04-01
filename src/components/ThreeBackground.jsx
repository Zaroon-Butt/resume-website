import { memo, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function TorusKnotMesh({ active }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const primaryGeometryRef = useRef(null)
  const wireGeometryRef = useRef(null)
  const primaryMaterialRef = useRef(null)
  const wireMaterialRef = useRef(null)

  useFrame((state, delta) => {
    if (!active || !meshRef.current || !groupRef.current) {
      return
    }

    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.y += delta * 0.35
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.18
  })

  useEffect(
    () => () => {
      primaryGeometryRef.current?.dispose()
      wireGeometryRef.current?.dispose()
      primaryMaterialRef.current?.dispose()
      wireMaterialRef.current?.dispose()
    },
    [],
  )

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry ref={primaryGeometryRef} args={[1.1, 0.28, 132, 18]} />
        <meshStandardMaterial
          ref={primaryMaterialRef}
          color="#0f1a26"
          emissive="#00f5ff"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.75}
        />
      </mesh>

      <mesh position={[0, 0, 0]} scale={1.015}>
        <torusKnotGeometry ref={wireGeometryRef} args={[1.1, 0.28, 132, 18]} />
        <meshBasicMaterial ref={wireMaterialRef} color="#00f5ff" wireframe opacity={0.75} transparent />
      </mesh>
    </group>
  )
}

function PolyMesh({ active, position, color, speed = 0.2 }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const primaryGeometryRef = useRef(null)
  const wireGeometryRef = useRef(null)
  const primaryMaterialRef = useRef(null)
  const wireMaterialRef = useRef(null)

  useFrame((state, delta) => {
    if (!active || !meshRef.current || !groupRef.current) {
      return
    }

    meshRef.current.rotation.x += delta * speed
    meshRef.current.rotation.y += delta * (speed + 0.12)
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.14
  })

  useEffect(
    () => () => {
      primaryGeometryRef.current?.dispose()
      wireGeometryRef.current?.dispose()
      primaryMaterialRef.current?.dispose()
      wireMaterialRef.current?.dispose()
    },
    [],
  )

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry ref={primaryGeometryRef} args={[0.48, 0]} />
        <meshStandardMaterial
          ref={primaryMaterialRef}
          color="#101826"
          emissive={color}
          emissiveIntensity={0.42}
          roughness={0.3}
          metalness={0.58}
        />
      </mesh>

      <mesh scale={1.02}>
        <icosahedronGeometry ref={wireGeometryRef} args={[0.48, 0]} />
        <meshBasicMaterial ref={wireMaterialRef} color={color} wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  )
}

function ThreeBackground({ active = true }) {
  const rendererRef = useRef(null)
  const devicePixelRatio = useMemo(
    () => (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1),
    [],
  )

  useEffect(
    () => () => {
      const renderer = rendererRef.current

      if (!renderer) {
        return
      }

      renderer.renderLists?.dispose?.()
      renderer.dispose?.()
      renderer.forceContextLoss?.()
      rendererRef.current = null
    },
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        dpr={devicePixelRatio}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false }}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(devicePixelRatio)
          rendererRef.current = gl
        }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 3, 2]} intensity={0.75} color="#00f5ff" />
        <pointLight position={[-3, -1, 2]} intensity={0.8} color="#ff6b35" />

        <TorusKnotMesh active={active} />
        <PolyMesh active={active} position={[-2.65, 1.2, -1]} color="#ff6b35" speed={0.28} />
        <PolyMesh active={active} position={[2.45, -1.1, -0.5]} color="#00f5ff" speed={0.22} />
      </Canvas>
    </div>
  )
}

export default memo(ThreeBackground)
