import { useState, useEffect } from 'react'
import './PhotoGallery.css'
import './GridGallery.css'



function getImage() {
    let images = ["https://www.investopedia.com/thmb/WCvv5K4z_ZiJ3yWL93Wylkc8bc0=/680x476/filters:fill(auto,1)/AdobeStock_80974696-5c921e8f46e0fb0001f8d140.jpeg",
        "https://us.123rf.com/450wm/forplayday/forplayday1601/forplayday160100027/50430104-high-resolution-images-presents-creating-planets-of-the-solar-system-.jpg?ver=6",
        "https://www.huameiwang.es/wp-content/uploads/2018/11/maxresdefault.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHqAxwQuf1iPrOBwEqwXJOb0pu9Kssm9oQpp9b9GR-2V8cwcUQ5Ndnb8TAuSqGYezkSw&usqp=CAU",
        "http://img95.699pic.com/photo/40064/1061.jpg_wh300.jpg",
        "https://m1.aboluowang.com/uploadfile/2019/1213/20191213095316357.webp",
        "http://img95.699pic.com/photo/40064/1061.jpg_wh300.jpg",
        "https://m1.aboluowang.com/uploadfile/2019/1213/20191213095316357.webp",
        "https://www.huameiwang.es/wp-content/uploads/2018/11/maxresdefault.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvHqAxwQuf1iPrOBwEqwXJOb0pu9Kssm9oQpp9b9GR-2V8cwcUQ5Ndnb8TAuSqGYezkSw&usqp=CAU",
        "https://us.123rf.com/450wm/forplayday/forplayday1601/forplayday160100027/50430104-high-resolution-images-presents-creating-planets-of-the-solar-system-.jpg?ver=6"]

    let num = Math.floor(Math.random() * images.length);
    let src = images[num]

    return src;
}

const PhotoGallery = () => {

    useEffect(() => {
        let ggBox = document.getElementById('gg-box')

        for (let i = 0; i < 30; i++) {
            let img = document.createElement('img')
            img.src = getImage();
            img.alt = "test"
            if (i % 5 === 0) {
                img.className = "card img-fluid"
            } else {
                img.className = "card card-tall img-fluid"
            }


            // i % 3 == 0 ? img.style.height = "95%" : null;

            if (i % 3 === 0)
                img.style.height = "95%"

            ggBox.appendChild(img);

            //RUN THE GRIDGALLERY SCRIPT:
            gridGallery({
                selector: ".dark",
                darkMode: true
            });

        }
    }, [])

    return (
        <div className='photoGallery' style={{ marginTop: '300px' }}>
            <div className='gg-container'>
                <div id='gg-box' className='gg-box dark'>

                </div>

            </div>

        </div>
    )
}

export default PhotoGallery;



///////// GRID GALLERY CODE :
const root = document.querySelector("body, html");
const container = document.querySelector('.gg-container');
const images = document.querySelectorAll(".gg-box > img");
const l = images.length;

for(var i = 0; i < l; i++) {
  images[i].addEventListener("click", function(i) {
    // alert('test')
    var currentImg = this;
    const parentItem = currentImg.parentElement, screenItem = document.createElement('div');
    screenItem.id = "gg-screen";
    container.prepend(screenItem);
    if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
    var route = currentImg.src;
    root.style.overflow = 'hidden';
    screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
    const first = images[0].src, last = images[l-1].src;
    const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
    imgItem.innerHTML = '<img src="' + route + '">';
    console.log('TEST')

    if (l > 1) {
      if (route == first) {
        prevBtn.hidden = true;
        var prevImg = false;
        var nextImg = currentImg.nextElementSibling;
      }
      else if (route == last) {
        nextBtn.hidden = true;
        var nextImg = false;
        var prevImg = currentImg.previousElementSibling;
      }
      else {
        var prevImg = currentImg.previousElementSibling;
        var nextImg = currentImg.nextElementSibling;
      }
    }
    else {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
    }

    screenItem.addEventListener("click", function(e) {
      if (e.target == this || e.target == close) hide();
    });

    root.addEventListener("keydown", function(e) {
      if (e.keyCode == 37 || e.keyCode == 38) prev();
      if (e.keyCode == 39 || e.keyCode == 40) next();
      if (e.keyCode == 27 ) hide();
    });

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    function prev() {
      prevImg = currentImg.previousElementSibling;
      imgItem.innerHTML = '<img src="' + prevImg.src + '">';
      currentImg = currentImg.previousElementSibling;
      var mainImg = document.querySelector(".gg-image > img").src;
      nextBtn.hidden = false;
      prevBtn.hidden = mainImg === first;
    };

    function next() {
      nextImg = currentImg.nextElementSibling;
      imgItem.innerHTML = '<img src="' + nextImg.src + '">';
      currentImg = currentImg.nextElementSibling;
      var mainImg = document.querySelector(".gg-image > img").src;
      prevBtn.hidden = false;
      nextBtn.hidden = mainImg === last;
    };

    function hide() {
      root.style.overflow = 'auto';
      screenItem.remove();
    };
  });
}

function gridGallery (options) {
    let selector;
  if (options.selector) selector = document.querySelector(options.selector);
  if (options.darkMode) selector.setAttribute("data-theme", "dark");
  if (options.layout == "horizontal" || options.layout == "square") selector.setAttribute("data-layout", options.layout);
  if (options.gaplength) selector.style.setProperty('--gap-length', options.gaplength + 'px');
  if (options.rowHeight) selector.style.setProperty('--row-height', options.rowHeight + 'px');
  if (options.columnWidth) selector.style.setProperty('--column-width', options.columnWidth + 'px');
}