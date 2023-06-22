import { useState, useEffect } from 'react'
import FirebaseFirestoreService from '../../services/FirebaseFirestoreService'
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

async function fetchPhotos() {
  let fetchedPhotos = [];



  const response = await FirebaseFirestoreService.readDocuments({ collection: 'Photos' })

  try {
    const myPhotos = response.docs.map((photoDoc) => {
      const id = photoDoc.id;
      const data = photoDoc.data();

      return { ...data, id }
    })

    fetchedPhotos = [...myPhotos]
  } catch (error) {
    console.log(error.message)
    throw error
  }


  return fetchedPhotos;
}




const PhotoGallery = () => {
  const [photoCollection, setPhotoCollection] = useState([])
  const [currentImg, setCurrentImg] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  //Populates the page with the stock images:
  // useEffect(() => {
  //     let ggBox = document.getElementById('gg-box')

  //     for (let i = 0; i < 30; i++) {
  //         let img = document.createElement('img')
  //         img.src = getImage();
  //         img.alt = "test"
  //         if (i % 5 === 0) {
  //             img.className = "card img-fluid"
  //         } else {
  //             img.className = "card card-tall img-fluid"
  //         }


  //         // i % 3 == 0 ? img.style.height = "95%" : null;

  //         if (i % 3 === 0)
  //             img.style.height = "95%"

  //         ggBox.appendChild(img);

  //         //RUN THE GRIDGALLERY SCRIPT:
  //         gridGallery({
  //             selector: ".dark",
  //             darkMode: true
  //         });

  //     }
  // }, [])

  useEffect(() => {

    // fetchPhotos('test')
    //     .then((fetchedPhotos) => {
    //         setPhotoCollection(fetchedPhotos)
    //     })
    fetchPhotos()
      .then((fetchedPhotos) => {
        setPhotoCollection(orderPhotos(fetchedPhotos))
      })
      .catch((error) => {
        console.error(error.message)
        throw error
      })
  }, [])

  const images = Array.from(document.querySelectorAll('.gg-box > img'));

  return (
    <div className="gg-container" >
      <div className="gg-box" style={{ gap: '20px', padding: '20px', marginTop: '200px' }}>
        {photoCollection.map((image, index) => (

          <img src={image.imageUrl} onClick={handleImageClick} key={index} alt={image.name} className={image.size} />

        ))}
      </div>

      {showGallery && (
        <div id="gg-screen" onClick={hideGallery}>
          <div className="gg-image">
            <img src={currentImg} />
          </div>
          <div className="gg-close gg-btn">&times;</div>
          {!isFirst && <div className="gg-prev gg-btn" onClick={handlePrev}>&larr;</div>}
          {!isLast && <div className="gg-next gg-btn" onClick={handleNext}>&rarr;</div>}
        </div>
      )}
    </div>
  )

  function orderPhotos(arr){
    return arr.sort((a, b) => a.displayOrder - b.displayOrder);
  
  }

  function handleImageClick(event) {
    const targetImg = event.target;
    setCurrentImg(targetImg.src);
    setShowGallery(true);
    setIsFirst(targetImg === images[0]);
    setIsLast(targetImg === images[images.length - 1]);
  }

  function hideGallery() {
    setShowGallery(false);
    setCurrentImg(null);
  }

  function handlePrev(event) {
    event.stopPropagation();
    const currentIndex = images.findIndex((img) => img.src === currentImg);
    const prevImg = images[currentIndex - 1];
    setCurrentImg(prevImg.src);
    setIsFirst(prevImg === images[0]);
    setIsLast(false);
  }

  function handleNext(event) {
    event.stopPropagation();
    const currentIndex = images.findIndex((img) => img.src === currentImg);
    const nextImg = images[currentIndex + 1];
    setCurrentImg(nextImg.src);
    setIsFirst(false);
    setIsLast(nextImg === images[images.length - 1]);
  }


}



export default PhotoGallery;

