import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Sphere } from '@react-three/drei'

export function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[1, 1, 1]} intensity={10} />
      <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="pink" />
      </Box>
      <OrbitControls />
    </Canvas>
  )
}
