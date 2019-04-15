import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dropzone from 'react-dropzone';
import { updata } from '../../action';

const doFile = (props, file) => {
  const {dispatch, path, id} = props;
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const base64Str = e.target.result;//获取base64
    console.log(base64Str);
    dispatch(updata({
      path: path + '/' + id,
    }, base64Str));
  }
  fileReader.readAsDataURL(file);
}

const onDragAction = props => (accepted, rejected) => {
  doFile(props, accepted[0]);
}

const onChangeAction = props => (event) => {
  doFile(props, event.target.files[0]);
}

const UIPicture = (props) => {
  const { classes, res, id, model } = props;
  return (
    <div className={classes.uiPicture}>
      <label className={classes.uiPictureTopLabel}>{res[id]}</label>
      <Dropzone onDrop={onDragAction(props)}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} onChange={onChangeAction(props)} />
            <p className={classes.uiPictureTip}>点击选择或拖拽到此处</p>
          </div>
        )}
      </Dropzone>
      <img className={classes.uiPicturePreview} src={model[id]} />
    </div>
  )
}

export default UIPicture;