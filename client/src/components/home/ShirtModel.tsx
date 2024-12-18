import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'

interface IProps {
  isLogoTexture: boolean
  isShirtTexture: boolean
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
}

const ShirtModel = ({ isLogoTexture, isShirtTexture, shirtColor, shirtLogo, shirtTexture }: IProps) => {
  const { nodes, materials } = useGLTF('/images/shirt_baked.glb') as unknown as {
    nodes: { T_Shirt_male: THREE.Mesh },
    materials: Record<string, THREE.Material>
  }

  const logoTexture = useTexture(shirtLogo)
  const bgTexture = useTexture(shirtTexture)

  useFrame((_, delta) => {
    easing.dampC((materials.lambert1 as THREE.MeshStandardMaterial).color, shirtColor, .25, delta)
  })

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {
          isShirtTexture &&
          <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={bgTexture}
          />
        }
        {
          isLogoTexture &&
          <Decal
            position={[0,.04,.15]}
            rotation={[0, 0, 0]}
            scale={.15}
            map={logoTexture}
          />
        }
      </mesh>
    </group>
  )
}

export default ShirtModel