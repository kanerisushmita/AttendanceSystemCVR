function hasloggedin(){
    return JSON.parse(sessionStorage.getItem("user"))? true:false;
}
export default hasloggedin;