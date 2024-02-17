const CLIENT_ID = ' ';
const CLIENT_SECRET = ' ';
const SPOTIFY_API_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_SEARCH_URL = 'https://api.spotify.com/v1/search';

const HAPPY_SONGS = ["Shake It Off", "22", "Me", "You Need To Calm Down", "We Are Never Ever Getting Back Together"];
const SAD_SONGS = ["Delicate", "Wildest Dreams", "All Too Well", "Back to December", "The Archer"];
const NEUTRAL_SONGS = ["Blank Space", "Style", "You Belong With Me", "End Game", "Cardigan"];

async function getAccessToken() {
    const response = await fetch(SPOTIFY_API_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

async function searchSongLinks(songName) {
    const accessToken = await getAccessToken();
    const response = await fetch(`${SPOTIFY_API_SEARCH_URL}?q=${songName}&type=track&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const data = await response.json();
    if (data.tracks.items && data.tracks.items.length > 0) {
        return data.tracks.items[0].external_urls.spotify;
    }
    return null;
}

async function recommendSongs() {
        const moodSelect = document.querySelector('.mood');
        const mood = moodSelect.value.toLowerCase();
        const songsList = document.getElementById('songsList');
        songsList.innerHTML = '';
        console.log(mood);
        let songs = [];
        switch (mood) {
            case 'joyous':
                songs = HAPPY_SONGS;
                break;
            case 'melancholy':
                songs = SAD_SONGS;
                break;
            case 'meh!?':
                songs = NEUTRAL_SONGS;
                break;
            default:
                songsList.innerHTML = '<p>Invalid mood entered.</p>';
                return;
        }
    
        for (let song of songs) {
            const link = await searchSongLinks(`Taylor Swift ${song}`);
            if (link) {
                songsList.innerHTML += `<p><a href="${link}" target="_blank">${song}</a></p>`;
            }
        }
    }
    

function changeBackground(){
    var backgroundArray = ["tay1.jpg","tay3.jpg","tay4.jpg","tay5.jpg","tay6.jpg" ,"tay7.jpg","tay8.jpg"]
  var a= Math.floor(Math.random(1)* backgroundArray.length)
  console.log(a)
    document.body.style.backgroundImage= "url(" + backgroundArray[a] + ")"
}
setInterval(changeBackground,6000);


   
