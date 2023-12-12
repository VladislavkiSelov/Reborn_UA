import React, { useState } from 'react';
import { ReactComponent as AddPhoto } from '../../images/no_photo.svg';
import './InputFile.scss';

export default function InputFile({ register_name, Controller, control }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPhotoUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className="box_input_file">
      <Controller
        name={register_name}
        control={control}
        render={({ field }) => (
          <input
            type="file"
            {...field}
            onChange={e => {
              field.onChange(e);
              handleFileChange(e);
            }}
          />
        )}
      />
      <div className="box_photo">
        {photoUrl === null ? <AddPhoto /> : <img alt="#" src={photoUrl} />}
      </div>
    </div>
  );
}
