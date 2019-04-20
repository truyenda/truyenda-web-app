import './Alert.scss';
import { confirmAlert } from 'react-confirm-alert';

export default {
    warn(title='Bạn có chắc chắn thực hiện hành động này', message='', onYes=()=>{console.log('yes')}, onNo=()=>{console.log('no')}, yesLabel='CÓ', noLabel='HỦY') {
        return confirmAlert({
            title: '⛔ '+title,
            message: message,
            buttons: [
              {
                label: yesLabel,
                onClick: () => onYes()
              },
              {
                label: noLabel,
                onClick: () => onNo()
              }
            ]
          });
    }
}