const ChapterModel = require('../models/chapter.model');
const ComicModel = require('../models/comic.model');
const UserModel = require('../models/user.model');
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
    addVideoChapter: async (req, res) => {
        try {
            //<--------------checking comic is already exist---------------->
            const chapterExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!chapterExist)
                return res.send("cannot find comic");

            const addVideo = {
                chapterNumber: req.params.chapterNumber,
                video: req.body.video
            }

            const checkChapterNumber = chapterExist.detail.find((chapter) => {
                return chapter.chapterNumber === addVideo.chapterNumber ? chapter : 0;
            });
            if (typeof checkChapterNumber === 'undefined')
                return res.send("Chapter is not exist !");
            if (checkChapterNumber.video !== "")
                return res.send("Chapter had video");
            checkChapterNumber.video = addVideo.video;
            await chapterExist.save();
            res.send("Video Chapter successfully added !");
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },
    updateVideoChapter: async (req, res) => {
        try {
            //<--------------checking comic is already exist---------------->
            const chapterExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!chapterExist)
                return res.send("cannot find comic");

            const addVideo = {
                chapterNumber: req.body.chapterNumber,
                video: req.body.video
            }

            const checkChapterNumber = chapterExist.detail.find((chapter) => {
                return chapter.chapterNumber === addVideo.chapterNumber ? chapter : 0;
            });
            if (typeof checkChapterNumber === 'undefined')
                return res.send("Chapter is not exist !");
            checkChapterNumber.video = addVideo.video;
            await chapterExist.save();
            res.send("Video Chapter successfully updated !");
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
    },

    newCommentChapter: async (req, res) => {
        try {
            //<--------------checking comic is already exist---------------->
            const chapterExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!chapterExist)
                return res.send("cannot find comic");
            let checkUserId = false;
            const users = await UserModel.find();
            const userIds = [];
            users.forEach(user => { if (user.token !== null) userIds.push(user._id) });
            const newComment = {
                chapterNumber: req.params.chapterNumber,
                postedBy: req.body.postedBy,
                content: req.body.content
            };
            userIds.forEach(userId => checkUserId = (!newComment.postedBy.localeCompare(userId)) ? true : false);

            let checkChapterNumber = chapterExist.detail.find((chapter) => {
                return  newComment.chapterNumber.localeCompare((chapter.chapterNumber - 1).toString())  ? chapter : 0;
            });
            if (typeof checkChapterNumber === 'undefined')
                return res.send("Chapter is not exist !");

            if (checkUserId) {
                checkChapterNumber.comments.push(newComment);
                res.send(checkChapterNumber.comments);
                await chapterExist.save();
            } else res.send("You must login before comment")

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }
    },

    getCommentChapter: async (req, res) => {
        try {
            const chapterExist = await ChapterModel.findOne({ comicID: req.params.id });
            if (!chapterExist)
                return res.send("cannot find comic");
            let checkChapterNumber = chapterExist.detail.find((chapter) => {
               return !chapter.chapterNumber.toString().localeCompare(req.params.chapterNumber) ? chapter : 0 ;
            });

            const listComments = [];
            const getUserComment = []
            checkChapterNumber.comments.forEach(comment => listComments.push(comment));
            for (let i = 0; i < listComments.length; i++) {
                const user = await UserModel.findOne({ _id: listComments[i].postedBy });
                let userComment = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    comment: listComments[i].content
                }
                getUserComment.push(userComment);
            }
            res.send(getUserComment);

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);

        }
    },
    getNewestChapter: async (req, res)=>{
        try {
            let details= [];
            let comic= [];
            let newestChapterUpload = [];
            let count = 0;
            const chapterExist = await ChapterModel.find();
            chapterExist.forEach(chapter => details.push(chapter.detail));
            details.forEach(time => comic.push(time[time.length-1].timeUpLoadChapter));
            comic.sort((a, b) => {
                return a < b ? 1 : -1;
            });
            for(let i =0 ; i<comic.length-1;i++){
                count++;
                newestChapterUpload.push(comic[i]);
                if(count === 10) break;
            }
            console.log(newestChapterUpload);
            res.send(newestChapterUpload);

        } catch (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err);

        }
    }
}