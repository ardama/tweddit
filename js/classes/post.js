var Post = function(content, user, time) {
  this.Init(content, user, time);
};

Post.prototype.Init = function(content, user, time) {
  this.content = content;
  this.user = user;
  this.time = time;

  this.likes = 0;
  this.comments = [];
};

Post.prototype.getDate = function() {
    return this.time.toDateString();
}
