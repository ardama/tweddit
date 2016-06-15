var Comment = function(content, user, post, time) {
  this.Init(content, user, post, time);
};

Comment.prototype.Init = function(content, user, post, time) {
  this.content = content;
  this.user = user;
  this.post = post;
  this.time = time;

  this.likes = 0;
};
