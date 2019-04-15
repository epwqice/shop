const UIComponentStyle = (theme) => ({
  textField: {
    width: '100%',
  },
  imgField: {
    display: 'flex',
    width: '80%',
    'justify-content': 'flex-end',
  },
  uiPicture: {
    'border-style': 'solid',
    'border-width': '1px',
    'margin-top': '16px',
    'border-radius': '4px',
    color: 'rgba(0, 0, 0, 0.23)',
    position: 'relative',
  },
  uiPictureTopLabel: {
    'font-family': 'Roboto, Helvetica, Arial, sans-serif',
    'z-index': 1,
    'pointer-events': 'none',
    'top': 0,
    'left': 0,
    'position': 'absolute',
    'transform': 'translate(14px, -6px) scale(0.75)',
    'transform-origin': 'top left',
    'font-size': '1rem',
    'line-height': 1,
    'color': 'rgba(0, 0, 0, 0.54)',
  },
  uiPictureTip: {
    padding: '0 0 0 8px',
  },
  uiPicturePreview: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '8px',
    right: '16px',
  },
  uiPictureView: {
    width: '50px',
  },
  uiTablePictureView: {
    width: '40px',
  },
});

export default UIComponentStyle;