import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import EditCameraRig from './EditCameraRig'
import EditModel from './EditModel'

interface IProps {
  isLogoTexture: boolean
  isShirtTexture: boolean
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
}

const EditCanvas = ({
  isLogoTexture,
  isShirtTexture,
  shirtColor,
  shirtLogo,
  shirtTexture
}: IProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0,0,0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={.5} />
      <Environment preset='city' />
      <EditCameraRig>
        <Center>
          <EditModel
            isLogoTexture={isLogoTexture}
            isShirtTexture={isShirtTexture}
            shirtColor={shirtColor}
            shirtLogo={shirtLogo}
            shirtTexture={shirtTexture}
          />
        </Center>
      </EditCameraRig>
    </Canvas>
  )
}

export default EditCanvas