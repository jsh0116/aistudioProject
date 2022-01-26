import React, { useState } from 'react';
import './slide.css';
import Carousel from 'react-material-ui-carousel';
interface Props {
  slideImageInfo: any;
}

const SlideImageBox: React.FC<Props> = (props: Props) => {
  const { slideImageInfo } = props;
  const slideInfoList: any[] = slideImageInfo;
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (cur?: number, prev?: number) => {
    if (cur !== undefined)
      setIndex(cur);
  };

  const renderImage = () => {
    return slideInfoList.map((imageInfo, index) => {
      return (
        <div>
          <img src={slideInfoList[index].Url} alt="" width="100%" height="100%" />
        </div>
      );
    })
  }

  return (
    <div>
      <Carousel
        index={index}
        animation="slide"
        indicators={false}
        stopAutoPlayOnHover
        swipe
        className="my-carousel"
      >
        {renderImage()}
      </Carousel>
    </div>
  )
};

export default SlideImageBox;