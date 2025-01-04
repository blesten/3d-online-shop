import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'

const EditCameraRig = ({ children }: { children: any }) => {
  const cameraRef = useRef<any>()

  useFrame((state, delta) => {
    const isMobile = window.innerWidth <= 600

    let targetPosition: any = [-5, -1, 2]
    if (isMobile)
      targetPosition = [0, -.17, 2.5]
    else
      targetPosition = [0, -.14, 2]

    easing.damp3(state.camera.position, targetPosition, .25, delta)

    easing.dampE(
      cameraRef.current.rotation,
      [state.pointer.y / 100, -state.pointer.x / 5, 0],
      .25,
      delta
    )
  })

  return (
    <group ref={cameraRef}>
      {children}
    </group>
  )
}

export default EditCameraRig