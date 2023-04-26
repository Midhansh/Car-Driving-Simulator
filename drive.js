AFRAME.registerComponent("drive", {
    init: function () {
        this.driveCar()
    },

    driveCar: function () {
        var multiply = 10;
        var wheelRotation = 0;
        window.addEventListener("keydown", function (e) {
            var wheel = document.querySelector("#control_wheel")
            if (e.code == "ArrowRight" && wheelRotation > -40) {
                wheelRotation -= 5
                wheel.setAttribute("rotation", {
                    x: 0, y: 0, z: wheelRotation
                })
            }
            if (e.code == "ArrowLeft" && wheelRotation < 40) {
                wheelRotation += 5
                wheel.setAttribute("rotation", {
                    x: 0, y: 0, z: wheelRotation
                })
            }
            var camera_rig = document.querySelector("#camera_rig")
            var cameraRotation = camera_rig.getAttribute("rotation")
            var cameraPostition = camera_rig.getAttribute("position")
            var cameraMoveControl = camera_rig.getAttribute("movement-controls")
            camera_rig.setAttribute("movement-controls", {
                "speed": cameraMoveControl.speed + 0.005
            })
            cameraDiection = new THREE.Vector3()
            camera_rig.object3D.getWorldDirection(cameraDiection)
            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                camera_rig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                camera_rig.setAttribute("movement-controls", {
                    "speed": cameraMoveControl.speed + 0.005
                })
            }
            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                camera_rig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })
                camera_rig.setAttribute("movement-controls", {
                    "speed": cameraMoveControl.speed + 0.005
                })
            }
            if (e.code == "ArrowUp") {
                multiply += 0.5
                if (multiply <= 100 && cameraPostition.z > -500) {
                    camera_rig.setAttribute("movement-controls", {
                        "speed": cameraMoveControl.speed + 0.005
                    })
                    var accelerate = document.querySelector("#control_acceleration")
                    accelerate.setAttribute("material", "color", "green")
                }
            }
            if (e.code == "Space") {
                camera_rig.setAttribute("movement-controls", {
                    "speed": 0
                })
                var stop = this.document.querySelector("#stop")
                stop.setAttribute("material", "color", "red")
            }


        })
        window.addEventListener('keyup', function (e) {
            var camera_rig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3(); 
            camera_rig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = camera_rig.getAttribute("movement-controls")
            if (e.code == "Space") {
                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "gray")
            }
            if (e.code == "ArrowUp") {
                if (multiply > 10) { 
                    multiply -= 0.5 
                    camera_rig.setAttribute("movement-controls", { "speed": cameraMoveControl.speed + 0.005 }) }
                    var accelerateCar = document.querySelector("#control-acce")
                    accelerateCar.setAttribute("material", "color", "gray")
            }
        })
    },

})