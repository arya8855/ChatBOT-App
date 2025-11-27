const express = require('express');
const authController = require('../controllers/auth');
const isAuthenticate = require('../middleware/isAuthenticate');
const router = express.Router();

router.put("/admin/update-password", isAuthenticate, authController.updateAdminPassword);

router.post('/register',  authController.postRegister);
router.post('/login',  authController.postLogin);
router.get('/logout', isAuthenticate, authController.getLogout);

//Member(User)
router.get('/user', isAuthenticate, authController.getMembers);
router.post('/user', isAuthenticate, authController.postMember);

router.get('/user/:memberID', isAuthenticate, authController.getMemberDetail);
router.put('/user/:memberID', isAuthenticate, authController.putMemberDetail);
router.delete('/user/:memberID', isAuthenticate, authController.deleteMember);

module.exports = router;