import { GrAdd } from 'react-icons/gr'

export default function ColorPicker({ colors, selected, onClick, allowCustom }) {
  return (
    <div className="ColorPicker">
      {colors.map((color) => (
        <button
          key={`color-${color.id}`}
          className={selected === color.id ? 'active' : ''}
          style={{backgroundColor: color.color, borderColor: color.color}}
          onClick={() => onClick(color)}
        />
      ))}
      { allowCustom && (
        <button
          className={selected === 'custom' ? 'active' : ''}
          onClick={() => onClick({id: 'custom'})}
          style={{backgroundColor: '#FFFFFF', borderColor: '#131411'}}
        >
          <GrAdd style={{verticalAlign: 'text-top'}}/>
        </button>
      )}
      <style jsx>{`
        .ColorPicker {
          margin-top: 10px;
        }
        button:hover, button.active {
          border-style: solid;
          border-width: 1px;
          box-shadow: 0px 0px 0px 2px #fff inset;
          cursor: pointer;
        }
        button {
          width: 20px;
          height: 20px;
          border-radius: 20px;
          border: rgba(0,0,0,0) solid 1px;
          box-shadow: 0px 0px 0px 2px #fff;
          margin-right: 6px;
          outline: none;

          line-height: 20px;
          text-align: center;
          vertical-align: top;
          padding: 0;
          font-size: 12px;
      }
      `}</style>
    </div>
  )
}