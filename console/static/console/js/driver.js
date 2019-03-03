



// initialize the playback SDK
var player;

var HARDTOK = 'BQCvZVUNC2Lgv9DhvIitUqhN81JElrRVEu5SzWp9MUumXBqqCa7QTE6mHD2iSfpr1hfDwdO776vlXEvjXyH_BZgkWDX3VFheS9Cx7ONmN-38KMZS6UR3ydaH47Dos9NfvJE8QUSxa4rMa4XvCGD_1dZsRoEpMHcJyeQ';

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = USERTOKEN;
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
  };

// set the auth token in the api

// var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(USERTOKEN);
spotifyApi.getUserPlaylists('awh4kc')
  .then(function(data) {
    console.log('User playlists', data);
  }, function(err) {
    console.error(err);
  });


// on Run button, eval text box

const play = (spotify_uri) => {
    player._options.getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };

  



function print(stuff) {
    document.getElementById("output").innerHTML += JSON.stringify(stuff) + '\n';
}

function run() {
    document.getElementById("output").innerHTML = "";
    scriptContent = document.getElementById("scriptContent");
    EDITOR.save();
    $.ajax({
      type: "POST",
      url: 'script/save/', 
      data: {
        'script': document.getElementById("scriptContent").value,
        'name': document.getElementById("scriptName").value,
      }, // TODO, not sure if its actually "data"
      success: function(data) {
        if (data['error']) // TODO confirm that this is actuall success code
          alert(data['result']);
        else
          print(data['result']);
      },
    });
    
    // clear all background user processes
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    
    try {
      eval(scriptContent.value);
    } catch (err) {
      print(err.message);
      console.log(err);
    }
}

// (function saver() {
//     EDITOR.save();
//     $.ajax({
//       type: "POST",
//       url: 'script/save/', 
//       data: {
//         'script': document.getElementById("scriptContent").value,
//         'name': document.getElementById("scriptName").value,
//       }, // TODO, not sure if its actually "data"
//       success: function(data) {
//         if (data['error']) // TODO confirm that this is actuall success code
//           alert(data['result']);
//         else
//           print(data['result'])
//       },
//       complete: function() {
//         // Schedule the next request when the current one's complete
//         setTimeout(saver, 5000);
//       }
//     });
//   })();



