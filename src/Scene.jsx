import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import { experiences } from './types/Types'

export function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[1, 1, 1]} intensity={10} />
      {experiences.map((xp, i) => (
        <Box position={[(-(experiences.length / 2)+i)/5, 0, 1]} scale={[0.05, 1, 1]} key={xp.name}>
            <meshStandardMaterial color={xp.color}/>
        </Box>
      ))}
      <OrbitControls />
    </Canvas>
  )
}
