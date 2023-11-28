import React from 'react';

const ModelCard = ({ model, modelNo, imageURL, onSelectModel }) => (
  <div className="model-card" onClick={() => onSelectModel(model, modelNo, imageURL)}>
    <img src={imageURL} alt={`${model} image`} />
    <p>{model}</p>
    <div className='model-number'><p>Model No: {modelNo}</p></div>
  </div>
);

const ModelSelection = ({ onSelectModel }) => {
  const models = [
    { model: 'Model 1', modelNo: '001', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 2', modelNo: '002', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 3', modelNo: '003', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 4', modelNo: '004', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 5', modelNo: '005', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 6', modelNo: '006', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 7', modelNo: '007', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
    { model: 'Model 8', modelNo: '008', imageURL: 'https://images.unsplash.com/photo-1559479083-f3b234ad0d53?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8am9yZGFuJTIwc2hvZXxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  return (
    <div className="model-selection">
      <div className="search-bar">
        <h2>BRAND</h2>
        <input type="text" placeholder="Search Brand.." />
      </div>
      <div className="model-grid">
        {models.map(({ model, modelNo, imageURL }) => (
          <ModelCard
            key={model}
            model={model}
            modelNo={modelNo}
            imageURL={imageURL}
            onSelectModel={onSelectModel}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelSelection;
