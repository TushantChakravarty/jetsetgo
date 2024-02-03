export async function getFlightBookings()
{
    const response = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7")
    //console.log('resp',response)
    const json = response.json()
    //console.log('json',json)
    return json 
}