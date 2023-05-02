export function getToday() {
    let date_ob = new Date()

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return new Date(year + "-" + month + "-" + date);
}