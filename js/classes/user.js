var User = function(name, description, image, time) {
  this.Init(name, description, image, time);
};

User.prototype.Init = function(name, description, image, time) {
  this.name = name;
  this.description = description;
  this.image = image;
  this.time = time;

  this.posts = [];
  this.comments = [];

  this.postLikes = 0;
  this.commentLikes = 0;

  this.followers = [];
  this.following = [];
};

User.prototype.getDate = function() {
  return this.time.toDateString();
}
