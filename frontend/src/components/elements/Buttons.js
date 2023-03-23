import React from 'react'

export const PrimaryButton = React.forwardRef((props, ref) => {
  const onClick = props.onClick
  
  return (
    <button 
        ref={ ref ?? null }
        onClick={ () => onClick() ?? null }
        className={ `rounded bg-violet-500 px-10 py-4 text-white font-bold my-10 ${props.className}` }>
        { props.children ? props.children : (props.label) ?? '' }
    </button>
  )
})

export const DefaultButton = React.forwardRef((props, ref) => {
  const onClick = props.onClick

  return (
      <button 
          ref={ ref ?? null }
          onClick={ () => onClick() ?? null }
          className={ `rounded bg-neutral-400 px-10 py-4 text-white font-bold my-10 ${props.className}` }>
          { props.children ? props.children : (props.label) ?? '' }
      </button>
  )
})
