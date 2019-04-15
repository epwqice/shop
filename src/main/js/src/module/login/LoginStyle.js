import UICreateStyle from '../../ui/component/UICreateStyle';
import UIComponentStyle from '../../ui/component/UIComponentStyle';
import UISnackbarStyle from '../../ui/component/UISnackbarStyle';

const UILoginStyle = theme => ({
  root: {
    'background-color': theme.palette.primary[500],
    width: '100%',
    height: '100%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
  login: {
    width: '30em',
  },
  ...UIComponentStyle(theme),
  ...UICreateStyle(theme),
  ...UISnackbarStyle(theme),
});

export default UILoginStyle;