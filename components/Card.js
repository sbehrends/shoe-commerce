import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage } from '@react-three/drei'

import { ChromePicker } from 'react-color'

import ShoeModel from './ShoeModel'
import ColorPicker from './ColorPicker'
import { usePrevious } from '../lib/utils'

const shoeColors = {
  1: {
    laces: '#231751',
    mesh: '#231751',
    caps: '#655799',
    inner: '#655799',
    sole: '#FFFFFF',
    stripes: '#FFFFFF',
    band: '#FFFFFF',
    patch: '#FFFFFF',
  },
  2: {
    laces: '#ad1a22',
    mesh: '#ad1a22',
    caps: '#df2f43',
    inner: '#df2f43',
    sole: '#FFFFFF',
    stripes: '#FFFFFF',
    band: '#df2f43',
    patch: '#FFFFFF',
  },
  3: {
    laces: '#5a646d',
    mesh: '#5a646d',
    caps: '#b9b8bb',
    inner: '#b9b8bb',
    sole: '#FFFFFF',
    stripes: '#38579d',
    band: '#38579d',
    patch: '#FFFFFF',
  },
  4: {
    laces: '#131411',
    mesh: '#131411',
    caps: '#3a3c38',
    inner: '#3a3c38',
    sole: '#FFFFFF',
    stripes: '#a42528',
    band: '#a42528',
    patch: '#a42528',
  }
}

// TODO: Pending implementation
function CustomHuePicker ({name, ...props}) {
  return (
    <div>
      {name} <ChromePicker disableAlpha={true} {...props}/>
    </div>
  )
}

export default function Card() {
  const [selectedColor, setSelectedColor] = useState('1')
  const [customColors, setCustomColors] = useState({
    custom: true,
  })

  const prevSelectedColor = usePrevious(selectedColor)
  
  useEffect(() => {
    if (selectedColor === 'custom') {
      const baseColors = shoeColors[prevSelectedColor]
      setCustomColors({...customColors, active: !customColors.active, ...baseColors})
    }
  }, [selectedColor])

  const ref = useRef()

  function handleCustomColorChange(prop, color) {
    const current = {
      ...customColors,
    }
    current[prop] = color
    setCustomColors(current)
  }

  // TODO: Slightly change camera on mouse over (parallax effect?)

  return (
    <div className="Card">
      <div style={{height: 300}}>
        <Canvas onPointerMove={() => console.log('move')} style={{flex: 1}} dpr={[1, 2]} camera={{ position: [4, 0, 0], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage ref={ref} shadows adjustCamera environment="city">
              <ShoeModel colors={selectedColor === 'custom' ? customColors : shoeColors[selectedColor]} position={[0, 0, -1]} />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
      <div className="Meta">
        <div className="flex">
          <h2 className="title">Adidas ULTRABOOST</h2>
          <span className="price">$120</span>
        </div>
        <span className="category">Running</span>
        <ColorPicker
          colors={Object.keys(shoeColors).map(id => ({id, color: shoeColors[id].laces}))}
          allowCustom={false}
          selected={selectedColor}
          onClick={(color) => setSelectedColor(color.id)}
        />
        <div>
          {/* TODO: Allow custom colors */}
          {/* {selectedColor === 'custom' &&(
            <>
              <CustomHuePicker name="Laces" color={customColors.laces} width={260} onChange={color => handleCustomColorChange('laces', color.hex)} />
              <CustomHuePicker name="Mesh" color={customColors.mesh} width={260} onChange={color => handleCustomColorChange('mesh', color.hex)} />
              <CustomHuePicker name="Caps" color={customColors.caps} width={260} onChange={color => handleCustomColorChange('caps', color.hex)} />
              <CustomHuePicker name="Inner" color={customColors.inner} width={260} onChange={color => handleCustomColorChange('inner', color.hex)} />
              <CustomHuePicker name="Sole" color={customColors.sole} width={260} onChange={color => handleCustomColorChange('sole', color.hex)} />
              <CustomHuePicker name="Stripes" color={customColors.stripes} width={260} onChange={color => handleCustomColorChange('stripes', color.hex)} />
              <CustomHuePicker name="Band" color={customColors.band} width={260} onChange={color => handleCustomColorChange('band', color.hex)} />
              <CustomHuePicker name="Patch" color={customColors.patch} width={260} onChange={color => handleCustomColorChange('patch', color.hex)} />
            </>
          )} */}
        </div>
      </div>
      <style jsx>{`
        .Card {
          width: 360px;
          // min-height: 360px;
          box-shadow: 0 10px 20px rgb(0 0 0 / 30%);
          background: #f5f5f5;
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .Meta {
          padding: 25px 25px;
          background: #FFFFFF;
        }

        .title {
          margin: 0;
          font-size: 22px;
          color: #393c45;
        }
        .price {
          color: #ff5757;
          font-size: 22px;
          font-weight: 600;
        }
        .category {
          color: #767677;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}