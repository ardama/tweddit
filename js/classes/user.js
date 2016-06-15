var User = function(name, image) {
  this.Init(name, image);
};

User.prototype.Init = function(name, image) {
  this.name = name;
  this.image = image;

  this.posts = [];
  this.comments = [];
  this.followers = [];
  this.following = [];
};
