import * as Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css"
import poi from "./assets/img/poi.png"
import { Popup } from "./utils/Popup"
import glb from "./assets/models/Cesium_Man.glb"
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
viewer.scene.debugShowFramesPerSecond = true

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

var poiEntity = viewer.entities.add({
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

var poiClickHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
var popup = null
poiClickHandler.setInputAction(function (click) {
    var earthPosition1 = viewer.camera.pickEllipsoid(
        click.position,
        viewer.scene.globe.ellipsoid
    );
    var cartographic1 = Cesium.Cartographic.fromCartesian(
        earthPosition1,
        viewer.scene.globe.ellipsoid,
        new Cesium.Cartographic()
    );
    var lat = Cesium.Math.toDegrees(cartographic1.latitude);
    var lng = Cesium.Math.toDegrees(cartographic1.longitude);
    var height = viewer.camera.positionCartographic.height;
    console.log(lat, lng);




    console.log(click);
    var pick = new Cesium.Cartesian2(click.position.x, click.position.y);
    if (pick) {
        // 获取点击位置坐标

        var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);

        var pick = viewer.scene.pick(click.position);
        // 获取点的经纬度
        var cartographic = Cesium.Cartographic.fromCartesian(pick.primitive._actualPosition);
        // 转换为数组，0经度，1纬度
        var point = [cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
        // 转换为Cartesian3
        var destination = Cesium.Cartesian3.fromDegrees(point[0], point[1], viewer.camera.positionCartographic.height);


        viewer.flyTo(poiEntity, {
            offset: {
                heading: Cesium.Math.toRadians(0.0),
                pitch: Cesium.Math.toRadians(-25),
            }
        })

        if (cartesian) {
            // 调用弹窗方法
            if (popup) {
                popup.open()
                return
            }
            popup = new Popup({
                viewer: viewer,
                geometry: cartesian
            })

            popup.initBillboard()
        }



    }



}, Cesium.ScreenSpaceEventType.LEFT_CLICK)








function getInstances() {

    var instances = [];

    var gridSize = Math.sqrt(10000);

    var cLon = 119.62128089865755;

    var cLat = 31.266636944240542;

    var spacing = 0.001;

    var height = 0.001;

    for (var y = 0; y < gridSize; ++y) {

        for (var x = 0; x < gridSize; ++x) {

            var longitude = cLon + spacing * (x - gridSize / 2);

            var latitude = cLat + spacing * (y - gridSize / 2);

            var position = Cesium.Cartesian3.fromDegrees(

                longitude,

                latitude,

                height

            );

            var heading = Math.random();

            var pitch = Math.random();

            var roll = Math.random();

            var scale = (Math.random() + 1.0) / 2.0 * 100;

            var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(

                position,

                new Cesium.HeadingPitchRoll(heading, pitch, roll)

            );

            Cesium.Matrix4.multiplyByUniformScale(

                modelMatrix,

                scale,

                modelMatrix

            );

            instances.push({

                modelMatrix: modelMatrix

            });

        }

    }

    return instances;

}


function createCollection() {

    var instances = getInstances();

    var instanceCollection = viewer.scene.primitives.add(

        new Cesium.ModelInstanceCollection({

            url: glb,

            instances: instances

        })

    );

}

createCollection()








