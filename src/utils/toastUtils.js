
import {toast} from "react-toastify";

export const showToast = (message, type = "default", options ={}) => {
    const config = {
        position : "top-right",
        autoClose : 3000,
        pauseOnHover : true,
        draggable : true,
        ...options
    };

    switch(type) {
        case "success":
            toast.success(message,config);
            break;
        case "error":
            toast.error(message,config);
            break;
        case "warn":
            toast.warn(message,config)
            break;
        case "info":
            toast.info(message, config);
            break;
            default: 
            toast(message, config)
    }
};