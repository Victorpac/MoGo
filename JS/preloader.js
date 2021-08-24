let 
  images = document.images,
  images_count = images.length,
  images_loaded_count = 0,
  preloader = document.getElementById('preloader');
  perc_display = document.getElementById('preload_perc');


for (let i = images_loaded_count; i < images_count; i++) {
  image_clone = new Image()
  image_clone.onload = image_loaded;
  image_clone.onerror = image_loaded;
  image_clone.src = images[i].src;
}


function image_loaded() {
  images_loaded_count++;
  
  perc_display.innerText = (( (100 / images_count) * images_loaded_count ) << 0) + "%";
  if (images_loaded_count <= images_count) {
    setTimeout(function () {
      if (!preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
      }
    }, 300)
  }
}