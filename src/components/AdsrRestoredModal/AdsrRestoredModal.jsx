import React from 'react'
import Button from 'components/Button/Button';
import './AdsrRestoredModal.scss'

export default function AdsrRestoredModal({AdsrRestored}) {
  return (
    <div className="AdsrRestoredModal" >
      <div className="confirmation">
        <h2 className="confirmation__title">Ваше оголошення відновленно</h2>
        <div className="confirmation__btn">
          <Button handelClick={AdsrRestored} classBtn="btn-blue btn-same-width"  text="Ок" />
        </div>
      </div>
    </div>
  )
}



