import { Text } from "@react-three/drei"

// A simplified Text3D component that doesn't rely on font loading
const Text3D = ({ children, position = [0, 0, 0], color = "#ffffff", size = 1, ...props }) => {
  return (
    <Text position={position} fontSize={size} color={color} anchorX="center" anchorY="middle" {...props}>
      {children}
    </Text>
  )
}

export default Text3D

