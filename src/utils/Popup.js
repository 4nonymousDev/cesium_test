import * as Cesium from "cesium";
export class Popup {
    constructor(position, viewer) {
        this.position = position
        this.viewer = viewer
        this.billboard = null
    }


    getPosition = function () {
        return this.position;
    }

    initDOM = function () {
        this.billboard = document.createElement("div")
        this.billboard.classList.add("billboards")
        this.billboard.style.width = "300px"
        this.billboard.style.height = "200px"
        this.billboard.style.backgroundColor = "black"
        this.billboard.style.display = "block"
        this.viewer.cesiumWidget.container.appendChild(this.billboard)
        this.viewer.scene.postRender.addEventListener(this.render, this)
    }

    render = function (position, viewer) {
        var position_window = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position)
        this.billboard.style.x = position_window.x
        this.billboard.style.x = position_window.y
    }


}
