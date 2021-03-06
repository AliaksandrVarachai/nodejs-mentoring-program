import express from 'express';

const router = new express.Router();

// Express somehow parses root directory, so, it is not necessary to use constructions like
// const publicDirPath = path.resolve(dirname(require.main.filename), '../public');
router.use('/', express.static('public'));

export default router;
