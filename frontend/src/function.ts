export const getDuration = (milliseconds:number)=>{
    let minutes = Math.floor(milliseconds/(1000 *60));
    let seconds = Math.floor((milliseconds/1000) %60);
    let formattedMinutes = "";
    let formattedSeconds = "";
    if(minutes <10){
        formattedMinutes = "0"+ minutes.toString();
    }else{
        formattedMinutes = minutes.toString();
    }
    if(seconds <10){
        formattedSeconds = "0" + seconds.toString();
    }else{
        formattedSeconds = seconds.toString();
    }
    return `${formattedMinutes}:${formattedSeconds}`;
}