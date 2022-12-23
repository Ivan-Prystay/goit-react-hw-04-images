import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notify = message =>
  toast.dark(message, {
    position: toast.POSITION.TOP_CENTER,
    type: toast.TYPE.INFO,
  });
