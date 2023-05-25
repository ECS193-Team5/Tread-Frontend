export function getToday() {
    let date_ob = new Date()

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return new Date(year + "-" + month + "-" + date);
}

export function getTodayString() {
    let date_ob = new Date()

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return year + "-" + month + "-" + date;
}

export function getTomorrowString(){
    var date_ob = new Date()
    date_ob.setDate(date_ob.getDate() + 1);

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return year + "-" + month + "-" + date;
  }

export function sendChallengeRedirect(type, identifier){
    window.location.href = "./addChallengePage?prefill="+type+"."+identifier;
  }