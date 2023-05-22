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
            // gridGallery({
            //     selector: ".dark",
            //     darkMode: true
            // });

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