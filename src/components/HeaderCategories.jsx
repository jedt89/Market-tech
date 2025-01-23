import React from 'react';

const HeaderCategories = () => {
  const categories = [
    'Placas madre',
    'Procesadores',
    'RAM',
    'Placa de video',
    'Fuentes',
    'Almacenamiento',
    'Gabinetes',
    'Perifericos',
    'Monitores',
    'Refrigeración'
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {categories.map((category, index) => {
        return (
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'aliceblue',
              borderRadius: '50%',
              margin: '10px'
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default HeaderCategories;
