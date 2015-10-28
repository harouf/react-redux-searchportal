import React, { Component } from 'react';
// import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Great Search Portal Based on ReactJS</h1>

            <h2>You may find awesome resources on this portal.</h2>

            <p className={styles.humility}>
              Created and maintained by <a href="#">@Fujio Harou</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <p>Home Page</p>
        </div>
      </div>
    );
  }
}
