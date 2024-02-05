const express = require("express");
const songController = require("../controllers/songcontroller");
const router = express.Router();

router.route("/").post(songController.createSongs);
router.route("/").get(songController.getSongs);
router.route("/:id").get(songController.getSong);
router.route("/:id").patch(songController.updateSong);
router.route("/:id").delete(songController.deleteSong);
router
  .route("/stat/totalNumberOfSongs")
  .get(songController.getTotalNumberOfSongs);
router
  .route("/stat/totalNumberOfArtist")
  .get(songController.getTotalNumberOfArtist);

router
  .route("/stat/totalNumberOfAlbums")
  .get(songController.getTotalNumberOfAlbums);

router
  .route("/stat/totalNumberOfGenres")
  .get(songController.getTotalNumberOfGenres);

router
  .route("/stat/totalNumberOfEachGenre")
  .get(songController.getSongsOfEveryGenre);
router
  .route("/stat/ArtistStat")
  .get(songController.getTotalNumberOfSongsAndAlbumsEachArtist);
router
  .route("/stat/AlbumStat")
  .get(songController.getTotalNumberOfSongsOfEachAlbum);

router
  .route("/stat/GenreStat")
  .get(songController.getTotalNUmberOfSongsInEachGenre);

module.exports = router;
