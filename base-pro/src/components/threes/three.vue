<template>
    <div class="three-wrap" ref="refContent"></div>
</template>

<script setup>
    import * as THREE from "three";
    import { onMounted, ref } from "vue";
    
    
    let refContent = ref("null");

    onMounted(() => {
        const width = refContent.value.offsetWidth;
        const height = refContent.value.offsetHeight;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        // document.body.appendChild( renderer.domElement );
        // 使用ref作为Three.js场景的挂载点，而不是document.body
        refContent.value && refContent.value.appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 2);
        var material = new THREE.MeshPhongMaterial({
            color:0xff0000
        });
        var cube = new THREE.Mesh(geometry, material);
        const pointLight = new THREE.PointLight(0xffffff, 2.0);
        pointLight.position.set(0, 1, 2); 
        scene.add(pointLight); //点光源添加到场景中
        scene.add(cube);
        camera.position.z = 5;
        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    });
</script>

<style lang="scss" scoped>
    .three-wrap{
        height: 100%;
    }
</style>