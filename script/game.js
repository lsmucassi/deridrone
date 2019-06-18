setInterval(gameLoop, 1000 / FPS);
        //set key inputs
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);

        function keyDown(/** @type {KeyboardEvent} */ ev) {
            switch(ev.keyCode) {
                case 32:        // space bar  key - for attack
                    shootLaser();
                    break;
                case 37:        // left arrow key - rotates drone left
                    drone.rot = ROT_SPEED / 180 * Math.PI / FPS;
                    break;
                case 38:        // up arrow key - move drone
                    drone.move = true;
                    break;
                case 39:        // right arrow key - rotates drone right
                    drone.rot = -ROT_SPEED / 180 * Math.PI / FPS;
                    break;
            }
        }

        //explode projectiles
        function explodeLaser() {
            drone.explodeTime = Math.ceil(EXPLODE_DUR * FPS);
            // ctx.fillStyle = "lime"
            // ctx.strokeStyle = "lime";
            // ctx.beginPath();
            // ctx.arc(drone.x, drone.y, drone.r, 0, Math.PI * 2, false);
            // ctx.fill();
            // ctx.stroke();
        }

        function keyUp(/** @type {KeyboardEvent} */ ev) {
            switch(ev.keyCode) {
                case 32:        // space bar  key - for attack
                    drone.canShoot = true;
                    break;
                case 37:        // left arrow key - STOP rotates drone left
                    drone.rot = 0;
                    break;
                case 38:        // up arrow key - STOP move drone
                    drone.move = false;
                    break;
                case 39:        // right arrow key - STOP rotates drone right
                    drone.rot = 0;
                    break;
            }
        }

        function newDrone () {
            return {
                // x: parseInt(droneX),      // x position
                // y: parseInt(droneY),     // y position
                x: canv.width / 2,
                y: canv.height / 2,
                r: DRONE_SIZE / 2,      // drone radius
                // f: parseInt(droneF) / 180 * Math.PI,   // set direction and convert to radians [0 - 90 - 180 - 270]
                f: 90 / 180 * Math.PI,
                rot: 0,
                canShoot: true,
                laser: [],
                explodeTime: 0,
                move: false,
                motion: {
                    x: 0,
                    y: 0
                }
            }
        }

        //shoot laser
        function shootLaser() {
            // make laser
            if (drone.canShoot && drone.laser.length < LASER_MAX) {
                drone.laser.push({      //shooting from drone head
                    x: drone.x + 4 / 3 * drone.r * Math.cos(drone.f),
                    y: drone.y - 4 / 3 * drone.r * Math.sin(drone.f),
                    xvel: LASER_SPEED * Math.cos(drone.f) / FPS,
                    yvel: - LASER_SPEED * Math.sin(drone.f) / FPS,
                    dist: 0
                })
            }
            //stop shooting
            drone.canShoot = false;
        }

        //game Loop
        function gameLoop(){
            //Draw board
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canv.width, canv.height);
            
            //drone motion
            if (drone.move) {
                drone.motion.x += DRONE_ACC * Math.cos(drone.f) / FPS;
                drone.motion.y -= DRONE_ACC * Math.sin(drone.f) / FPS;

                //Draw motion effect  [Triangular shape]
                ctx.fillStyle = "white";
                ctx.strokeStyle = "blue";
                ctx.lineWidth = DRONE_SIZE / 20;
                ctx.beginPath();
                //head of drone
                ctx.moveTo(
                    drone.x - drone.r * (2 / 3 * Math.cos(drone.f) + 0.5 * Math.sin(drone.f)),
                    drone.y + drone.r * (2 / 3 * Math.sin(drone.f) - 0.5 * Math.cos(drone.f))
                );
                //rear left of drone
                ctx.lineTo(
                    drone.x - drone.r * 6 / 3 * Math.cos(drone.f),
                    drone.y + drone.r * 6 / 3 * Math.sin(drone.f)
                );
                //rear right of drone
                ctx.lineTo(
                    drone.x - drone.r * (2 / 3 * Math.cos(drone.f) - 0.5 * Math.sin(drone.f)),
                    drone.y + drone.r * (2 / 3 * Math.sin(drone.f) + 0.5 * Math.cos(drone.f))
                );
                ctx.closePath();    //completes path
                ctx.fill()
                ctx.stroke();       //draws the path
            } else {
                drone.motion.x -= FRICT * drone.motion.x;
                drone.motion.y -= FRICT * drone.motion.y;
            }
            //Draw drone  [Triangular shape]
            ctx.strokeStyle = "white";
            ctx.lineWidth = DRONE_SIZE / 20;
            ctx.beginPath();
            //head of drone
            ctx.moveTo(
                drone.x + 4 / 3 * drone.r * Math.cos(drone.f),
                drone.y - 4 / 3 * drone.r * Math.sin(drone.f)
            );
            //rear left of drone
            ctx.lineTo(
                drone.x - drone.r * (2 / 3 * Math.cos(drone.f) + Math.sin(drone.f)),
                drone.y + drone.r * (2 / 3 * Math.sin(drone.f) - Math.cos(drone.f))
            );
            //rear right of drone
            ctx.lineTo(
                drone.x - drone.r * (2 / 3 * Math.cos(drone.f) - Math.sin(drone.f)),
                drone.y + drone.r * (2 / 3 * Math.sin(drone.f) + Math.cos(drone.f))
            );
            ctx.closePath();    //completes path
            ctx.stroke();       //draws the path

            //rotate drone
            drone.f += drone.rot;

            drone.x += drone.motion.x;
            drone.y += drone.motion.y;

            //border validation
            // if (drone.x < 0 - drone.r) {
            //     drone.x = canv.width + drone.r;
            // } else if (drone.x > canv.width + drone.r) {
            //     drone.x = 0 - drone.r;
            // }
            // if (drone.y < 0 - drone.r) {
            //     drone.y = canv.height + drone.r;
            // } else if (drone.y > canv.height + drone.r) {
            //     drone.y = 0 - drone.r;
            // }

                // X Border
            if (drone.x - DRONE_SIZE /2 < 0) {
                drone.motion.x = 0;
                // drone.move = false;
            } else {
                 //move drone
                drone.x += drone.motion.x;
                
            }
            if (drone.x + DRONE_SIZE / 2 > canv.width) {
                drone.motion.x = 0;
                // drone.move = false;
            }  else {
                 //move drone
                drone.x += drone.motion.x;
                
            }
            //Y Borders
            if (drone.y - DRONE_SIZE /2 < 0) {
                drone.motion.y = 0;
                // drone.move = false;
            }  else {
                 //move drone
             
                drone.y += drone.motion.y;
            }
            if (drone.y + DRONE_SIZE / 2 > canv.height ) {
                drone.motion.y = 0;
                // drone.move = false;
            }  else {
                 //move drone
                drone.y += drone.motion.y;
            }


            for (var i = drone.laser.length - 1; i >= 0; i--) {
                if (drone.laser[i].dist > LASER_DST * canv.width) {
                    explodeLaser();
                    ctx.fillStyle = "darkred"
                    ctx.beginPath();
                    ctx.arc(drone.laser[i].x, drone.laser[i].y, drone.r * 1.2, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "red"
                    ctx.beginPath();
                    ctx.arc(drone.laser[i].x, drone.laser[i].y, drone.r * 1.1, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "orange"
                    ctx.beginPath();
                    ctx.arc(drone.laser[i].x, drone.laser[i].y, drone.r * 0.7, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "yellow"
                    ctx.beginPath();
                    ctx.arc(drone.laser[i].x, drone.laser[i].y, drone.r * 0.4, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "white"
                    ctx.beginPath();
                    ctx.arc(drone.laser[i].x, drone.laser[i].y, drone.r * 0.2 , 0, Math.PI * 2, false);
                    ctx.fill();
                    drone.explodeTime--;
                    
                    drone.laser.splice(i, 1);
                    continue;
                }

                drone.laser[i].x += drone.laser[i].xvel;
                drone.laser[i].y += drone.laser[i].yvel;

                drone.laser[i].dist += Math.sqrt(Math.pow(drone.laser[i].xvel, 2) + Math.pow(drone.laser[i].yvel, 2));
            }
            //shoot lasers
            for (var i = 0; i < drone.laser.length; i++) {
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(drone.laser[i].x, drone.laser[i].y, DRONE_SIZE / 15, 0, Math.PI * 2, false);
                ctx.fill();
            }
            //center of drone
            ctx.fillStyle = "red";
            ctx.fillRect(drone.x - 1, drone.y - 1, 2, 2);
            
        }
