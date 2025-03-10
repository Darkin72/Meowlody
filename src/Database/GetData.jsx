async function getData() {
  var data = [];
  try {
    const response = await fetch("http://localhost:7205/songs");
    var data = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    console.log(data);
    data = data.map((row) => {
      row.valid = true;
      return row;
    });
    return data;
  }
}

export async function getPlaylists() {
  let playlists = [
    { id: 1, name: "Favourites" },
    {
      id: 2,
      name: "My playlist",
    },
  ];
  return playlists;
}

export async function getPlaylistSongs(playlistId) {
  let playlistSongs = (await getData()).slice(0, 12, 2);
  if (playlistId === 1) {
    return playlistSongs;
  } else {
    return [];
  }
}
export default getData;
