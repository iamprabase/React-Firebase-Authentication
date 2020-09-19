import React from 'react'
import Background from '../images/bg-01.jpg'

const backgroundStyle = {
  backgroundImage: `url(${Background})`,
};

export default function Header({ title }) {
  return (
    <>
      <div className="login100-form-title" style={backgroundStyle}>
        <span className="login100-form-title-1">{title}</span>
      </div>
    </>
  );
}
