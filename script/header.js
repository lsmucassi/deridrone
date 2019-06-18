const FPS = 30;         // frames per second
        const DRONE_SIZE = 20;  // size of drone
        const ROT_SPEED = 90;  // turn speed
        const DRONE_ACC = 5     // drone acceleration in px per sec
        const FRICT = 0.7       // friction to slow done the drone on release
        const LASER_MAX = 100   // Maximum number of projectile in a screen at a time
        const LASER_SPEED = 500 // Speed of projectile laser
        const LASER_DST = 0.1   // distance a laser can travel
        const EXPLODE_DUR = 0.3       // duration of explosion

        
        /** @type {HTMLCanvasElement} */
        var canv = document.getElementById("gameBoard");
        var ctx = canv.getContext("2d");

        //drone
        var drone = new newDrone(); 
        // {
        //     x: canv.width / 2,      // x position
        //     y: canv.height / 2,     // y position
        //     r: DRONE_SIZE / 2,      // drone radius
        //     f: 90 / 180 * Math.PI,   // set direction and convert to radians [0 - 90 - 180 - 270]
        //     rot: 0,
        //     move: false,
        //     motion: {
        //         x: 0,
        //         y: 0
        //     }
        // }
