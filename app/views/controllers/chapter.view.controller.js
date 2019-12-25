const ChapterModel = require('../../api/models/chapter.model');
const httpStatus = require('http-status');

module.exports = {
    getListChapter: async (req, res) => {
        try {
            let chapterComic = await ChapterModel.findOne({ comicID: req.params.id });
            let detail = chapterComic.detail
            res.render('comics/chapters/index', {
                chapterComic: chapterComic,
                detail: detail
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getImage: async (req, res) => {
        try {
            let chapterComic = await ChapterModel.findOne({ comicID: req.params.id });
            let detail = chapterComic.detail;
            detail.forEach(element => {
                let isEqual = req.params.chapterNumber.localeCompare(element.chapterNumber.toString());
                if (!isEqual) {
                    let arrImg = element.image;
                    let video = element.video;
                    res.render('comics/chapters/detail', {
                        arrImg: arrImg,
                        video: video
                    });
                }
            })
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
};