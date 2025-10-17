import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Box, OrbitControls } from '@react-three/drei'
import { useState, useRef } from 'react'
import { ProjectDetail } from './Project'

function RotatingBox({ xp, i, total, hoveredProject, onHoverProject }) {
  const ref = useRef()
  const offset = i * 0.1

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = (state.clock.elapsedTime + offset) * 0.25
    }
  })

  // Highlight if this box's project matches the hovered project
  const color = hoveredProject === xp.project ? 'yellow' : xp.color

  return (
    <Box
      ref={ref}
      key={xp.name}
      name={xp.name}
      position={[(-(total / 2) + i) / 10, 0, 1]}
      scale={[0.02, 1, 1]}
      onPointerMove={(e) => {
        e.stopPropagation()
        onHoverProject(xp.project) // set the hovered project
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHoverProject(null) // clear on pointer out
      }}
    >
      <meshStandardMaterial color={color} />
    </Box>
  )
}

export function Scene({ experiences }) {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const selectedData = experiences.find((xp) => xp.project === selectedProject)

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[1, 1, 1]} intensity={10} />

      {experiences.map((xp, i) => (
        <RotatingBox
          key={xp.name}
          xp={xp}
          i={i}
          total={experiences.length}
          hoveredProject={hoveredProject}
          onHoverProject={setHoveredProject}
          onClickProject={setSelectedProject}
        />
      ))}

      <OrbitControls />

      {/* Tooltip for hover */}
      {hoveredProject && !selectedProject && (
        <Html position={[0, 1, 0]}>
          <div style={{ padding: '4px 8px', background: 'white', borderRadius: '4px' }}>
            Hovering: {hoveredProject}
          </div>
        </Html>
      )}

      {/* Detailed info panel */}
      <ProjectDetail data={selectedData} onClose={() => setSelectedProject(null)} />
    </Canvas>
  )
}
