import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {THREE} from './three_wrapper'

var camera, scene, renderer;
var geometry, material, mesh, loader;
 var loadingManager;
init();
animate();
 
function init() {
 
  loadingManager = new THREE.LoadingManager(()=>scene.add(geometry));

  loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
    //could update a progress meter the user can see here
  };

  loadingManager.onError = function ( url ) {

    console.log( 'There was an error loading ' + url );
  
    //could display an error the user can see here if one occurs
  };

    loader = new THREE.ColladaLoader(loadingManager);
    loader.load('./model/arcade.dae', (collada)=> geometry=collada.scene);

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 2;
    camera.position.y = 0.25;
    scene = new THREE.Scene();
 
    //geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1,1,0).normalize();


    scene.add(directionalLight);

    //material = new THREE.MeshNormalMaterial();
 
    //mesh = new THREE.Mesh( geometry, material );
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
}
 
function animate() {
 
    requestAnimationFrame( animate );
  
    if(geometry!==undefined)
    {
      /*geometry.rotation.x += 0.01;*/
      /*geometry.rotation.y += 0.02;*/
      geometry.rotation.z += 0.005;
    }
    renderer.render( scene, camera );
 
}

class App extends Component {
  render() {
    return (<div id="root"></div>);
  }
}

export default App;
