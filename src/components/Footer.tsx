import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div>
        <p>GroceryHub © {new Date().getFullYear()}</p>
        <p>All rights reserved.</p>
      </div>
      <div>
        <p>Contact Us: info@groceryhub.com</p>
      </div>
    </footer>
  );
};

export default Footer;
