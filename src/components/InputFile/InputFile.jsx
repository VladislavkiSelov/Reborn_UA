import React, { useState } from 'react';
import { ReactComponent as AddPhoto } from '../../images/no_photo.svg';
import './InputFile.scss';

export default function InputFile({ register_name, setValue }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = event => {
      setPhotoUrl(fileReader.result);
      setValue(register_name,e.target.files[0]);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className="box_input_file">
      <input
        accept="image/*"
        type="file"
        onChange={e => {
          handleFileChange(e);
        }}
      />
      <div className="box_photo">{photoUrl === null ? <AddPhoto /> : <img alt="#" src={photoUrl} />}</div>
    </div>
  );
}
