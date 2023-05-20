import { useState , useEffect} from 'react';
import { createProfilePictureURL } from '../../helpers/CloudinaryURLHelpers';
import '../../css/Challenge/photoDisplay.css';

const PhotoDisplay = (props) => {
    const [pictureDiv, setPictureDiv] = useState([]);

    useEffect(
        () => {
            if (props.photos) {
                let pictures = createURLS(props.photos);
                let firstThreePhotos = moveList(pictures);
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

    function calculateStyle(index, photoLength, additionalNumber){
        let length = photoLength;

        if(additionalNumber> 0){
            length += 1;
        }

        let startingIndex = (180 - (46 + 36*(length-1)))/2;
        let position = startingIndex + (-10)*index;
        let z_index = index;
        let style = {"position":"relative", "z-index":z_index, "left":position};

        return style
    }

    function createPhotoObj(pictureURL, index, photoLength, additionalNumber){
        console.log("Index is", index);
        return (<div className = "holder" key = {pictureURL}><img className = "photoDisplayObj"  style = {calculateStyle(index, photoLength, additionalNumber)} src = {pictureURL} alt = "profile"/></div>);
    }

    function calculatePictureDiv(firstThreePhotos, additionalNumber){
        let photoObj = [];
        for(let i = 0; i < firstThreePhotos.length; i++){
            photoObj.push(createPhotoObj(firstThreePhotos[i], i, firstThreePhotos.length, additionalNumber));
        }

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