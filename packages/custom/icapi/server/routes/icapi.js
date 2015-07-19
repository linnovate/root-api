'use strict';

var projectController = require('../controllers/project'),
    taskController = require('../controllers/task'),
    commentController = require('../controllers/comments'),
    profileController = require('../controllers/profile'),
    usersController = require('../controllers/users'),
    elasticsearchController = require('../controllers/elasticsearch'),
    attachmentsController = require('../controllers/attachments');

//var permissionController = require('../controllers/permission');

module.exports = function(Icapi, app, auth) {

    app.route('/api/projects')
    //.all(auth.requiresLogin, permissionController.echo)
    .post(projectController.create)
        .get(projectController.all);
    app.route('/api/projects/:id')
        .get(projectController.read)
        .put(projectController.update)
        .delete(projectController.destroy);

    app.route('/api/tasks')
        .post(auth.requiresLogin, taskController.create)
        .get(taskController.all);
    app.route('/api/tasks/tags')
        .get(taskController.tagsList);
    app.route('/api/tasks/:id/star')
        .patch(taskController.starTask);
    app.route('/api/tasks/starred')
        .get(taskController.getStarredTasks);
    app.route('/api/tasks/:id')
        .get(taskController.read)
        .put(auth.requiresLogin, taskController.update)
        .delete(taskController.destroy);

    app.route('/api/:entity/:id/tasks')
        .get(taskController.getByEntity);
    app.route('/api/history/tasks/:id')
        .get(taskController.readHistory);

    app.route('/api/comments')
        .post(auth.requiresLogin, commentController.create)
        .get(commentController.all);
    app.route('/api/comments/:id')
        .get(commentController.read)
        .put(auth.requiresLogin, commentController.update)
        .delete(commentController.destroy);
    app.route('/api/history/comments/:id')
        .get(commentController.readHistory);

    app.route('/api/profile')
        .get(auth.requiresLogin, profileController.profile, profileController.show)
        .put(auth.requiresLogin, profileController.profile, profileController.update);
    app.route('/api/avatar')
        .post(auth.requiresLogin, profileController.profile, profileController.uploadAvatar, profileController.update)

    app.route('/api/users')
        .get(usersController.read);

    app.route('/api/attachments')
        .post(auth.requiresLogin, attachmentsController.upload, attachmentsController.create)
        .get(auth.requiresLogin, attachmentsController.query);
    app.route('/api/attachments/:id')
        .get(attachmentsController.read)
        .post(auth.requiresLogin, attachmentsController.upload, attachmentsController.update);
    app.route('/api/history/attachments/:id')
        .get(attachmentsController.readHistory);
    app.route('/api/attachments/upload')
        .post(auth.requiresLogin, attachmentsController.upload);
    app.route('/api/search')
        .get(elasticsearchController.search);












    //temporary -because of swagger bug with 'tasks' word

    app.route('/api/task')
        .post(taskController.create)
        .get(taskController.all);
    app.route('/api/task/tags')
        .get(taskController.tagsList);
    app.route('/api/task/:id/star')
        .patch(taskController.starTask);
    app.route('/api/task/starred')
        .get(taskController.getStarredTasks);
    app.route('/api/task/:id')
        .get(taskController.read)
        .put(taskController.update)
        .delete(taskController.destroy);
};