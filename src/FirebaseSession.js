firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    this.setState({ loggedIn: "true" });
  }
  else {
    this.setState({ loggedIn: "false" });
  }
}.bind(this));
