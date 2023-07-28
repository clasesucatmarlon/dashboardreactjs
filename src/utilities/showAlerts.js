import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function showAlert(msg, icon, focus='') {
    onfocus(focus);
    const mySwal = withReactContent(Swal);
    mySwal.fire (
        {
            title: msg,
            icon: icon
        }
    )
}


function onfocus(focus) {
    if (focus !== '') {
        document.getElementById(focus).focus();
    }
}

