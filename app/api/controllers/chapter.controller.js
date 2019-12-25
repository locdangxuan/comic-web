const ChapterModel = require('../models/chapter.model');
const ComicModel = require('../models/comic.model');
const httpStatus = require('http-status');

module.exports = {
    createListChapter: async (req, res) => {
        try {
            // const comicExist = await ChapterModel.findOne({ comicID: req.params.id });
            // if (comicExits)
            //     return res.status(httpStatus.BAD_REQUEST).send('Comic already have chapters');

            const chapterNumberExist = await ChapterModel.findOne({ chapterNumber: req.body.detail[0].chapterNumber });
            if (chapterNumberExist)
                return res.status(httpStatus.BAD_REQUEST).send("chapter already exist");
            //<-------------------------create a list comic------------------------------>
            const chapter = new ChapterModel({
                comicID: req.params.id,
                detail: req.body.detail
            });
            //<-------------------------save to database---------------------------->
            await chapter.save();
            res.send("Chapter successfully created !");
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    addNewChapter: async (req, res) => {
        try {
            //<--------------checking comic is already exist---------------->
            const comicExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!comicExist)
                return res.send("cannot find comic");

            const newChapter = {
                chapterNumber: req.body.chapterNumber,
                description: req.body.description,
                image: req.body.image,
                video: req.body.video,
                content: req.body.content
            }

            const checkChapterNumber = comicExist.detail.find((chapter) => {
                return chapter.chapterNumber === newChapter.chapterNumber;
            });
            if (typeof checkChapterNumber !== "undefined")
                return res.send("Chapter is exist !");

            comicExist.detail.push(newChapter);
            comicExist.detail.sort((a, b) => {
                return a.chapterNumber > b.chapterNumber ? 1 : -1;
            });
            await comicExist.save();
            res.send("Chapter successfully added !");
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    updateChapter: async (req, res) => {
        try {

            //<-----------------------update info----------------------------->
            const comic = await comicModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            await comic.save();
            res.send('update successfully!');

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    deleteChapter: async (req, res) => {
        try {
            const comicExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!comicExist)
                res.send("cannot find comic");
            const removeChapter = req.body.chapterNumber;
            const getChapter = comicExist.detail.find((element) => {
                return element.chapterNumber === removeChapter;
            });
            if (typeof removeChapter === "undefined")
                res.send("Chapter is not exist !");
            comicExist.detail.splice(removeChapter - 1, 1);
            res.send("Chapter is deleted !");
            await comicExist.save();
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getListChapter: async (req, res) => {
        try {
            const chapter = await ChapterModel.findOne({ comicID: req.params.id });
            res.send(chapter);
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    newestChapter: async (req, res) => {
        try {
            const chapter = await ChapterModel.findOne({ comicID: req.params.id });
            const detail = chapter.detail;
            const newestChapter = detail[detail.length - 1];
            res.send(newestChapter);
        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    }
}