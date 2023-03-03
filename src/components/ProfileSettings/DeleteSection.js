import '../../css/Shared/header.css'
import '../../css/Shared/coloredText.css';
import '../../css/Shared/button.css';
const DeleteSection = () => {

    function deleteAccount(){
      var config = {
        method : 'delete',
        url : backend_url + 'user/delete_account',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      };
      axios(config)
      .then(function(response){
        window.location.href = "./";
      })
      .catch(function(error){
        console.log(error)
      });
    }
    return (
        <div id = "DeleteSection">
            <h2>Delete Account</h2><p>
            <span className = "greenBaseText">This will </span>
            <span className = "redBaseText">permanently delete</span>
            <span className = "greenBaseText"> your account. You will </span>
            <span className = "redBaseText">lose</span>
            <span className = "greenBaseText"> all your friends, leagues, and medals. All your insights will be gone with no way to recover them. </span></p>
            <button className = "DeleteButton" onClick = {deleteAccount}>Delete</button>

        </div>
    )
}

export default DeleteSection;