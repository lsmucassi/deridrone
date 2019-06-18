var droneX, droneY, droneF;
        
    //get input values to place drone
    const modal = document.querySelector('.modal-body'),
            form = document.querySelectorAll('.form'),
            submit  = form[0].querySelector('button[type="submit"]');

    function getFormData(e) {
        // e.preventDefault();
        var formData = new FormData(form[0]);

        droneX = formData.get('posX');
        droneY = formData.get('posY');
        droneF = formData.get('direction');
        // alert(droneF + ' ' + droneX + ' ' + droneY);
    }

    document.addEventListener('DOMContentLoaded', function(){
        submit.addEventListener('click', getFormData, false)
    }, false)