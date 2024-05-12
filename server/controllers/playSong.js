const { default: axios } = require("axios");

const PlaySong = async (request, response) => {
    try{
        const res = await axios.post('https://accounts.spotify.com/api/token',
        'grant_type=client_credentials&client_id=ca63cca672014c05a9fffafaf65f6436&client_secret=5e715f3d28694633b3417b45e85ed31d', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.status(200).json(res.data);
    }catch(e)
    {
        return response.status(500).json({error:e});
    }
}

const getSong = async(request,response)=>{
    try{
        const data = await axios.get(`https://api.spotify.com/v1/tracks/77DRzu7ERs0TX3roZcre7Q`, {
                headers: {
                    'Authorization': 'Bearer BQDmvjgPIllDt0735nopxnGz6gEqDLFfnlUiFW838lR-TCCZ-LBqskJMdEDGHB2oCstZDkDSLvCexwj3ZK-w5_bzymHq9J-bahfteLDHRrb3sEADp_s' // Replace with your Spotify access token
                }
            })
            //"areyo")
            
            return response.status(500).send(data.data)
        
    }catch(e){
        //"namaste",e)
        response.send(e)
    }
}
module.exports = {PlaySong,getSong};