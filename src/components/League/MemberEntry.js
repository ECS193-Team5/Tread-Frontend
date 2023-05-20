import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/League/member.css";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { setDisplayProperty, reloadPage } from '../../helpers/CssEffects';
import DropDown from '../Shared/DropDown';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const MemberEntry = (props) => {
  const [load, setLoad] = useState(false);
  const [selectShow, setSelectShow] = useState();
  const [memberDropDownEntries, setMemberDropDownEntries] = useState([]);

  useEffect(
    () => {
      if (!load) {
        calculateMemberEntries();
        setLoad(true);
      }
    }, [load]
  );

  function calculateMemberEntries() {
    let scrollType = props.scrollType;
    let otherUserType = props.children.role;
    let selfType = props.selfType;
    let ifSelfAdmin = selfType === "admin" || selfType === "owner";
    let ifTeamMember = selfType === "admin" || selfType === "owner" || selfType === "participant";

    let dropdownOptions = [];
    if (ifTeamMember) {
      dropdownOptions.push({ "name": "Friend", "func": addFriend });
      dropdownOptions.push({ "name": "Block", "func": block });
    }

    if (ifSelfAdmin && scrollType === "Members" && otherUserType !== "owner") {
      dropdownOptions.push({ "name": "Kick Out", "func": kickOut });
      dropdownOptions.push({ "name": "Ban", "func": ban });
    }

    if (ifSelfAdmin && otherUserType === "admin" && scrollType === "Members") {
      dropdownOptions.push({ "name": "Remove Admin", "func": removeAdmin });
    }

    if (ifSelfAdmin && otherUserType === "participant" && scrollType === "Members") {
      dropdownOptions.push({ "name": "Add Admin", "func": addAdmin });
    }

    if (scrollType === "Pending" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Accept", "func": accept });
      dropdownOptions.push({ "name": "Decline", "func": decline });
    }

    if (scrollType === "Banned" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Unban", "func": unban });
    }

    if (scrollType === "Invited" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Revoke Invite", "func": revoke });
    }
    setMemberDropDownEntries(dropdownOptions);
  }

  function addFriend() {
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/send_friend_request',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        friendName: props.children.username
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        reloadPage();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function block() {
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/block_user',
      headers: {
        Accept: 'application/json',
      },
      data:
      {

        friendName: props.children.username
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        reloadPage();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function kickOut() {
    var config = {
      method: 'post',
      url: backend_url + 'league/kick_member',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID,
        leagueName: props.leagueName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function ban() {
    var config = {
      method: 'post',
      url: backend_url + 'league/ban_user',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID,
        leagueName: props.leagueName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function removeAdmin() {
    var config = {
      method: 'post',
      url: backend_url + 'league/remove_admin',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID,
        leagueName: props.leagueName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        reloadPage();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function addAdmin() {
    var config = {
      method: 'post',
      url: backend_url + 'league/add_admin',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID,
        leagueName: props.leagueName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        reloadPage();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function accept() {
    var config = {
      method: 'post',
      url: backend_url + 'league/accept_join_request',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function decline() {
    var config = {
      method: 'post',
      url: backend_url + 'league/decline_request',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function unban() {
    var config = {
      method: 'post',
      url: backend_url + 'league/unban_user',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function revoke() {
    var config = {
      method: 'post',
      url: backend_url + 'league/undo_invite',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        recipient: props.children.username,
        leagueID: props.leagueID
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        setDisplayProperty(props.children.username + "MemberEntry", "none");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/";
        }
      });
  }

  function toggleSelectShow() {
    setSelectShow(!selectShow);
  }

  return (
    <div id = {props.children.username + "MemberEntry"} className="memberEntry">
      <div className="memberEntryLeft">
        <div>
          <img className="memberPicture" src={createProfilePictureURL(props.children.username)} />
        </div>
        <div class="memberNames">
          <p className="memberDisplayName memberEntryText">{props.children.displayName}</p>
          <p className="memberUsername memberEntryText">{props.children.username}</p>
        </div>
      </div>
      <div className="memberEntryRight">


        <div>
          {(props.children.role === "admin" || props.children.role === "owner") ?
            <img src="https://i.imgur.com/551l8WX.png" alt="key" />
            :
            <></>
          }
        </div>
        <div>
          {(props.children.role === "owner") ?
            <img src="https://i.imgur.com/FuiEy2B.png" alt="crown" />
            :
            <></>
          }
        </div>

        <div className="moreInfoDiv">
          <button className="moreInfoButton" onClick={toggleSelectShow}>
            <img src="https://i.imgur.com/pnzihUp.png" />
          </button>
          {(selectShow) ? <div className="memberSelectOptions"><DropDown>{memberDropDownEntries}</DropDown></div> : <></>}
        </div>
      </div>

    </div>

    )
}

export default MemberEntry;