import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ShirtModel from './ShirtModel'
import CameraRig from './CameraRig'

interface IProps {
  isLogoTexture: boolean
  isShirtTexture: boolean
  shirtColor: string
  shirtLogo: string
  shirtTexture: string
  isCustomize: boolean
}

const ShirtCanvas = ({ isLogoTexture, isShirtTexture, shirtColor, shirtLogo, shirtTexture, isCustomize }: IProps) => {  
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={.5} />
      <Environment preset='city' />
      <CameraRig isCustomize={isCustomize}>
        <Center>
          <ShirtModel
            isLogoTexture={isLogoTexture}
            isShirtTexture={isShirtTexture}
            shirtColor={shirtColor}
            shirtLogo={shirtLogo}
            shirtTexture={shirtTexture}
          />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default ShirtCanvas