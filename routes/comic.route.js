const express = require('express');
const router = express.Router();

const comicController = require('../app/api/controllers/comic.controller');
const chapterController = require('../app/api/controllers/chapter.controller');

//<---------------get list comic------------------------->
router.get('/set-newest-chapter', comicController.setNewestChapter);
router.get('/get-newest-chapter', chapterController.getNewestChapter);
router.get('/search-comic', comicController.searchComic);
router.get('/list-comic', comicController.getListComic);
router.get('/list-comic-done', comicController.getListComicDone);
router.get('/random-12-comic', comicController.random12ComicsFromList);
router.get('/random-13-comic', comicController.random13ComicsFromList);
router.get('/rank-view-comic', comicController.rankViewComic);
router.get('/categories', comicController.getCategories);
router.post('/create-comic', comicController.create);
router.delete('/delete-comic', comicController.delete);
router.get('/:id', comicController.getComicById);
router.put('/:id/update-comic', comicController.update);
router.put('/:id/follow-comic', comicController.followComics);
router.post('/:id/unfollow-comic', comicController.unFollowComics);

//<----------------chapter in each comic----------------->
router.post('/:id/create-list-chapter', chapterController.createListChapter);
router.post('/:id/add-new-chapter', chapterController.addNewChapter);
router.post('/:id/add-video-chapter', chapterController.addVideoChapter);
router.post('/:id/update-video-chapter', chapterController.updateVideoChapter);
router.put('/:id/update-chapter', chapterController.updateChapter);
router.get('/:id/list-chapter', chapterController.getListChapter);
router.post('/:id/delete-chapter', chapterController.deleteChapter);
router.get('/:id/newest-chapter', chapterController.newestChapter);

// <------------comment in comic and chapter ----------------->
router.post('/:id/new-comment', comicController.newCommentComic);
router.get('/:id/get-comment', comicController.getCommentComic);
router.post('/:id/:chapterNumber/new-comment', chapterController.newCommentChapter);
router.get('/:id/:chapterNumber/get-comment', chapterController.getCommentChapter);


module.exports = router;