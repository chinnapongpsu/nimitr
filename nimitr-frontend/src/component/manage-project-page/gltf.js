import { useLoader, useFrame } from '@react-three/fiber'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'
import { AnimationMixer } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const GltfModel = ({
  modelPath,
  scale = 40,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  dracoLoader
}) => {
  const ref = useRef()
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })
  const [mixer] = useState(() => new AnimationMixer())
  const [hovered, hover] = useState(false)

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.clipAction(gltf.animations[0], ref.current).play()
    }
  }, [gltf.animations, mixer])
  useFrame((state, delta) => {
    mixer.update(delta)
    ref.current.rotation.x = rotation[0]
    ref.current.rotation.y = rotation[1]
    ref.current.rotation.z = rotation[2]
    // ref.current.rotation.y += 0.003
  })

  return (
    <primitive
      ref={ref}
      // eslint-disable-next-line react/no-unknown-property
      object={gltf.scene}
      // eslint-disable-next-line react/no-unknown-property
      position={position}
      scale={hovered ? scale * 1.2 : scale}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    />
  )
}

GltfModel.propTypes = {
  modelPath: PropTypes.string.isRequired,
  scale: PropTypes.number,
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number)
}

GltfModel.defaultProps = {
  scale: 40,
  position: [0, 0, 0],
  rotation: [0, 0, 0]
}

export default GltfModel
