import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Map } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';
import classNames from 'classnames';
import { updata } from '../../action';

const changeTextValueAction = props => event => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/textfield/value',
  }, event.target.value));
}

const selectAction = props => (event) => {
  const { dispatch } = props;
  // if(e.poi.location) {
  //   this.setState({center:{longitude: e.poi.location.lng, latitude: e.poi.location.lat}})
  // } 
  dispatch(updata({
    path: '/path',
  }, event));
}

const addressChangeAction = (props) => (event) => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/address',
  }, event.target.value));
}

const submitAction = (props) => (event) => {
  const { _model } = props;
  console.log(_model);
}

const UserPage = (props) => {
  const { _model, classes } = props; // const _model = props._model;
  const options = {
    city: '全国',
  };

  return (<div style={{ width: '100%', height: '400px' }}>
  <Map amapkey={'bfc2d0d57e779a5048033d522dc8ee2b'} >
    <Autocomplete options={options} onSelect={selectAction(props)} style={{
      width: '100%'
    }} placeholder='搜索'/>
  </Map>
  <TextField
      key={'address'}
      id={'address'}
      label={'地址'}
      value={_model.address}
      onChange={addressChangeAction(props)}
      className={classNames(classes.textField)}
      margin='normal'
      variant="outlined"
    />
    <Button 
      variant="contained" 
      color="primary" 
      onClick={submitAction(props)}
      className={classes.orderTotalButton}>
      提交
    </Button>
</div>);
}

export default UserPage;