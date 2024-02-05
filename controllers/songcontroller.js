const express = require("express");
const Song = require("../models/songModel");

// Create an song
exports.createSongs = async (req, res) => {
  try {
    const { title, artist, genre, album } = req.body;
    const song = new Song({ title, artist, genre, album });
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all songs from db
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (!songs) {
      res.status(200).json({ message: "No Registred songs" });
    }
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one song by id
exports.getSong = async (req, res) => {
  try {
    //check if id is valid mongoose id
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ error: "song not found" });
    }
    const songId = req.params.id;
    console.log("id =" + songId);
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json({ data: song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an song
exports.updateSong = async (req, res) => {
  try {
    const { title, artist, genre, album } = req.body;
    const song = await Song.findOne({
      _id: req.params.id,
    });
    if (!song) {
      return res.status(404).json({ error: "song not found" });
    }
    song.artist = artist;
    song.title = title;
    song.genre = genre;
    song.album = album;
    await song.save();
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Remove an song
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findOneAndRemove({
      _id: req.params.id,
    });
    //const song = await song.findOneAndRemove({ id: req.params.id });
    if (!song) {
      return res.status(404).json({ error: "song not found" });
    }
    res.json({ message: "song removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfSongs = async (req, res) => {
  try {
    const distinctSongs = await Song.distinct("title");
    const totalSongs = distinctSongs.length;
    res.json({ totalNumberOfSongs: totalSongs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfArtist = async (req, res) => {
  try {
    const distinctArtists = await Song.distinct("artist");
    const totalArtist = distinctArtists.length;
    res.json({ totalNumberOfArtist: totalArtist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfGenres = async (req, res) => {
  try {
    const distinctGenres = await Song.distinct("genre");
    const totalGenres = distinctGenres.length;
    res.json({ totalNumberOfGenres: totalGenres });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfAlbums = async (req, res) => {
  try {
    const distinctAlbums = await Song.distinct("album");
    const totalAlbums = distinctAlbums.length;
    res.json({ totalNumberOfAlbums: totalAlbums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSongsOfEveryGenre = async (req, res) => {
  try {
    const distinctGenres = await Song.distinct("genre");
    const songsOfEveryGenre = [];
    for (const genre of distinctGenres) {
      const songs = await Song.find({ genre: genre });
      songsOfEveryGenre.push({ genre: genre, songs: songs.length });
    }
    res.json({ songsOfEveryGenre: songsOfEveryGenre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfSongsAndAlbumsEachArtist = async (req, res) => {
  try {
    const distinctArtists = await Song.distinct("artist");
    const songsAndAlbumsEachArtist = [];
    for (const artist of distinctArtists) {
      const songs = await Song.find({ artist: artist });
      const albums = await Song.distinct("album", { artist: artist });
      songsAndAlbumsEachArtist.push({
        artist: artist,
        songs: songs.length,
        albums: albums.length,
      });
    }
    res.json({ songsAndAlbumsEachArtist: songsAndAlbumsEachArtist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNumberOfSongsOfEachAlbum = async (req, res) => {
  try {
    const distinctAlbums = await Song.distinct("album");
    const songsOfEachAlbum = [];
    for (const album of distinctAlbums) {
      const songs = await Song.find({ album: album });
      songsOfEachAlbum.push({
        album: album,
        songs: songs.length,
        artist: songs[0].artist,
      });
    }
    res.json({ songsOfEachAlbum: songsOfEachAlbum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalNUmberOfSongsInEachGenre = async (req, res) => {
  try {
    const distinctGenres = await Song.distinct("genre");
    const songsOfEachGenre = [];
    for (const genre of distinctGenres) {
      const songs = await Song.find({ genre: genre });
      songsOfEachGenre.push({ genre: genre, songs: songs.length });
    }
    res.json({ songsOfEachGenre: songsOfEachGenre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
