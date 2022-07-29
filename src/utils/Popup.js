import * as Cesium from "cesium";
export class Popup {
    constructor(info) {
        this.viewer = info.viewer;//弹窗创建的viewer
        this.geometry = info.geometry;//弹窗挂载的位置

    }


    initBillboard = () => {

        this.billboard = document.createElement('div')
        this.billboard.classList.add('popup-ctn')
        this.viewer.container.appendChild(this.billboard)


        this.billboard.innerHTML = this.createHtml()
        var closeBtn = document.getElementsByClassName('popup-close-button')
        closeBtn[0].addEventListener('click', this.close)
        this.render(this.geometry);
        this.eventListener = this.viewer.clock.onTick.addEventListener((clock) => {
            this.render(this.geometry);
        })
    }

    createHtml = (header, content) => {
        var html =
            '<div class="popup-content" >' +
            "hhhhhhhhhhh" +
            '</div>' +
            '</div>' +
            '<div class="popup-tip-container" >' +
            '<div class="popup-tip" >' +
            '</div>' +
            '</div>' +
            '<a class="popup-close-button" >X</a>';
        return html;
    }

    render = (geometry) => {
        var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, geometry)
        this.billboard.style.left = position.x - this.billboard.offsetWidth / 2 + 'px'

        this.billboard.style.top = position.y - this.billboard.offsetHeight - 40 + 'px'
    }

    remove = (element) => {
        element.remove()
        this.viewer.clock.onTick.removeEventListener(this.eventListener)
    }

    close = (e) => {
        this.billboard.style.display = 'none'

    }

    open = (e) => {
        this.billboard.style.display = 'block'
    }

}
