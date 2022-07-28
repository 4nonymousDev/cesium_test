import * as Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css"
import poi from "./assets/img/poi.png"
import { Popup } from "./utils/Popup"
const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    timeline: false,
    homeButton: false,
    fullscreenButton: false,
    navigationHelpButton: false,
    baseLayerPicker: false,
    infoBox: false,
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        layer: "tdtVecBasicLayer",
        style: "default",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false
    })
});

viewer._cesiumWidget._creditContainer.style.display = 'none';

viewer.camera.setView({
    destination: {
        x: -2894968.3141965433,
        y: 4707603.661964261,
        z: 3249279.9492745944
    },
    orientation: {

        heading: 6.146820159073263,
        pitch: -0.6269434885360945,
        roll: 0.0000031693919346764687
    }
})

viewer.entities.add({
    id: "p3",
    position: Cesium.Cartesian3.fromDegrees(
        121.47216727476994,
        31.180230443639275,
        100
    ),
    billboard: {
        image: poi,
        width: 50,
        height: 50,
    },
});


viewer.screenSpaceEventHandler.setInputAction(function (e) {
    var position = viewer.scene.pickPosition(e.position)
    var feature = viewer.scene.pick(e.position);
    console.log(feature);
    var popup = new Popup(feature.primitive.position, viewer)
    popup.initDOM()

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);





