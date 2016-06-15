var app = angular.module('Tweddit', []).controller('MainController', ['$scope', function ($scope) {
  scope = $scope;
  $scope.users = createTestUsers();
  $scope.posts = grabTestPosts($scope.users);

  $scope.currentUser = $scope.users[0];

  $scope.newPost = {
    placeholder: "What's on your mind? (140 characters)",
    content: ""
  };

  $scope.newComment = {
    placeholder: "What are your thoughts? (140 characters)",
    content: "",
    post: null
  };

  $scope.likePost = function(post, dislike) {
    if ($scope.currentUser) {
      post.likes += dislike ? -1 : 1;
    }
  };

  $scope.likeComment = function(comment, dislike) {
    if ($scope.currentUser) {
      comment.likes += dislike ? -1 : 1;
    }
  };

  $scope.isFollowing = function(user, targetUser) {
    return user.following.indexOf(targetUser) >= 0;
  };

  $scope.followUser = function (user) {
    if ($scope.currentUser && !$scope.isFollowing($scope.currentUser, user)) {
      $scope.currentUser.following.push(user);
      user.followers.push($scope.currentUser);
    }
  };

  $scope.unfollowUser = function (user) {
    if ($scope.currentUser && $scope.isFollowing($scope.currentUser, user)) {
      $scope.currentUser.following.splice($scope.currentUser.following.indexOf(user), 1);
      user.followers.splice(user.followers.indexOf($scope.currentUser), 1);
    }
  };

  $scope.submitPost = function() {
    if ($scope.currentUser && $scope.newPost.content.length > 0) {
      var p = new Post($scope.newPost.content, $scope.currentUser, new Date());
      $scope.currentUser.posts.push(p);
      $scope.posts.push(p);
      $scope.newPost.content = "";
    }
  };

  $scope.submitComment = function() {
    if ($scope.currentUser && $scope.newComment.content.length > 0) {
      var c = new Comment($scope.newComment.content, $scope.currentUser, new Date());
      $scope.currentUser.comments.push(c);
      $scope.newComment.post.comments.push(c);
      $scope.newComment.content = "";
    }
  };

  $scope.showComments = function(post) {
    $scope.hideComments();
    $scope.newComment.post = post;
  };

  $scope.hideComments = function() {
    $scope.newComment.post = null;
    $scope.newComment.content = "";
  };

}]);




function createTestUsers() {
  var names = ["John", "Mary", "Frank"];
  var users = [];

  for (var i = 0; i < names.length; i++) {
    var u = new User(names[i], "icon-user-default.png");
    for (var j = 0; j <= i; j++) {
      var p = new Post(u.name + " Test Post " + j, u, new Date());
      u.posts.push(p);
      for (var k = 0; k <= j; k++) {
        var user = users[k] || u;
        var c = new Comment("Comment by " + user.name, user, p, new Date());
        p.comments.push(c);
        user.comments.push(c);
      }
    }
    users.push(u);
  }
  return users;
};

function grabTestPosts(users) {
  var posts = [];
  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    for (var j = 0; j < u.posts.length; j++) {
      posts.push(u.posts[j]);
    }
  }
  return posts;
};
