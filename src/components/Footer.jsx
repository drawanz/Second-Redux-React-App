import React, { Component } from 'react';
import { FaReact } from 'react-icons/fa';
import { SiRedux } from 'react-icons/si';
import styles from './Footer.module.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className={ styles.Footer }>
        <div className={ styles.ContentFooter }>
          <p>
            {`Feito pelo Grupo 14 (Daniela, Eloisa, Felipe, Julio, Leônidas),
            utilizando React`}
            <span>
              {' '}
              <FaReact />
              {' '}
            </span>
            e Redux
            <span>
              {' '}
              <SiRedux />
            </span>
          </p>
        </div>
      </footer>
    );
  }
}
