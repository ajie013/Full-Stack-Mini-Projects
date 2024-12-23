import Swal from 'sweetalert2'


function popUpMessageToast(icon, title, width) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        width: width,
        showConfirmButton: false,
        timer: 1500,

    });
    Toast.fire({
        icon: icon,
        title: title
    });
}


export default popUpMessageToast