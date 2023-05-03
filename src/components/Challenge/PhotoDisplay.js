import { useState , useEffect} from 'react';
import { createProfilePictureURL } from '../../Helpers/CloudinaryURLHelpers';
import '../../css/Challenge/photoDisplay.css';

const PhotoDisplay = (props) => {
    const [pictureDiv, setPictureDiv] = useState([]);

    useEffect(
        () => {
            if (props.photos) {
                let pictures = createURLS(props.photos);
                console.log("pCitures" , pictures);
                let firstThreePhotos = moveList(pictures);
                console.log("first Three photos", firstThreePhotos);
                calculatePictureDiv(firstThreePhotos, pictures.length - 3);
            }
        }, [props.photos]
    );


    function min(a, b){
        return (a<b?(a):b);
    }

    const createURLS = (usernames) => {
        return usernames.map(createProfilePictureURL);
    }

    function moveList(pictures) {
        let list_ = [];
        for(let i = 0; i < min(pictures.length, 3); i++){
            list_.push(pictures[i]);
        }
        return list_;
    }

    function createPhotoObj(pictureURL){
        return (<div className = "holder" key = {pictureURL}><img className = "photoDisplayObj"  src = {pictureURL} alt = "profile"/></div>);
    }

    function calculatePictureDiv(firstThreePhotos, additionalNumber){
        let photoObj = firstThreePhotos.map(createPhotoObj);

        if (additionalNumber > 0){
            let additional = <div id = "numberObj" className='photoDisplayObj lastPhotoDisplay'><p className = "lastPhotoText">+{additionalNumber}</p></div>
            photoObj.push(additional);
        }

        setPictureDiv(photoObj);
    }

    return (
        <div id = "PhotoDisplay">
            {pictureDiv}
        </div>
    );

}


export default PhotoDisplay;