const { Router } = require('express');

const multer = require("multer");
const userRoutes = Router();
const path = require("path");
const fileExtension = require("file-extension")
const crypto = require("crypto")

const userController = require('./userController');
const auth = require('./../../lib/authmiddleware');
const { isRequestValidated, validateSingupRequest, validatemobile } = require("./../../lib/validationuser")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/userupload');
    },
    filename: (req, file, cb) => {
        const fileexce = (file.originalname).split('.').pop();
        const filenemo = Date.now();
        const fileName = `${filenemo}.${fileexce}`;
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

userRoutes.post('/insertUser', validateSingupRequest, isRequestValidated, userController.register);
userRoutes.post('/mobileLogin', validatemobile, isRequestValidated, userController.login);
userRoutes.post('/emailLogin', userController.emaillogin);
userRoutes.post('/socialLogin', userController.sociallogin);
userRoutes.post('/verifyMobile', userController.verify);
userRoutes.post('/resendOTP', userController.resendOtp);
userRoutes.post("/updateUserNote", auth, userController.updateUserNote_page);
userRoutes.post('/workerStatus', auth, userController.add_workerStatus);

userRoutes.get("/timesheet", auth, userController.timesheet);
userRoutes.get('/timesheet-user',auth, userController.timesheet_user_details);
userRoutes.get('/getProfile', auth, userController.getProfile);
userRoutes.get('/getTradeCategories', auth, userController.getTradeCategories);
userRoutes.get('/getEntryDetails', auth, userController.getEntryDetails);

userRoutes.put("/edittimesheet/:id",auth, userController.edit_timesheet);
userRoutes.put('/updateEntryDetails', auth, userController.updateEntryDetails);
userRoutes.put('/updateEntryDate', auth, userController.updateEntryDate);
userRoutes.put('/updateSiteAddress', auth, userController.updateSiteAddress);
userRoutes.put('/updateEntryTime', auth, userController.updateEntryTime);
userRoutes.put('/updateTimeInOut', auth, userController.updateTimeInOut);

userRoutes.put('/removeTask', auth, userController.removeTask);
userRoutes.put('/updateProfile', auth, upload.single("image"), userController.updateprofile);
userRoutes.put('/endworkingStatus', auth, userController.end_workerStatus);
userRoutes.put('/uploadsImage', auth, upload.single("image"), userController.uploadsImg);

userRoutes.delete('/removeEntry', auth, userController.removeEntryDetails);


exports.userRoutes = userRoutes;