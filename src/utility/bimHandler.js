const onMessageReceivedFromIframe = (e) => {
    if (e.origin !== process.env.REACT_APP_VIEWER_SERVER_HOST) return;
    //console.log(typeof (e.data) === 'string' ? console.log((JSON.parse(e.data)).type) : e.data)
    //console.log(e.data);

    try {
        const obj = (typeof e.data === 'object' ? e.data : JSON.parse(e.data))
        //console.log(obj)
        switch (obj.type) {
            case 'MSG_ENTITY_SELECTED':
            //改變物件變色
            /*msgSetEntityColor(iframeWindow, [
            [obj.data.selectionIds[0], [49/255,200/255,248/255]],
            ]);*/
            //console.log(obj.data.selectionIds[0]);
            break
        case 'MSG_CAMERA_CHANGE':
            //console.log('相機在轉');
            break
        //模型加載完成
        case 'MSG_MODEL_READY':
            //console.log('模型加載完成');
            //不顯示工具列
            //msgSetToolbarItems(iframeWindow, []); 
            break
        case 'MSG_MODEL_TREE_READY':
            break
        //模型拍照功能
        case 'MSG_SNAPSHOT_CAPTURED':
            console.log(obj.data.status);
            break
        default:
            break
        }
    } catch (error) {
        console.log(error);
    }
}

const addIframeListener = () => {
    window.addEventListener('message', onMessageReceivedFromIframe);
    }

const removeIframeListener = () => {
    window.removeEventListener('message', onMessageReceivedFromIframe);
}

const addIframeCustomListener = (handler) => {
    window.addEventListener('message', handler);
    }

const removeIframeCustomListener = (handler) => {
    window.removeEventListener('message', handler );
}

export {addIframeListener, 
        removeIframeListener,
        addIframeCustomListener,
        removeIframeCustomListener
    };