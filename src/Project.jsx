import { Html } from '@react-three/drei'

export function ProjectDetail({ data, onClose }) {
  if (!data) return null

  return (
    <Html position={[0, 1, 1]} style={{ width: '300px' }}>
      <div
        style={{
          background: 'rgba(0,0,0,0.85)',
          color: 'white',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'sans-serif',
          lineHeight: '1.4',
        }}
      >
        <h2 style={{ margin: '0 0 8px' }}>{data.project}</h2>
        <p style={{ margin: '0 0 12px' }}>{data.description}</p>
        {data.features && (
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {data.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          style={{
            marginTop: '12px',
            padding: '6px 12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </Html>
  )
}
