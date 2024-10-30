import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default Home
