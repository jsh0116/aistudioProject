import React, { useState } from 'react';
import './slideImage.scss';
import Carousel from 'react-material-ui-carousel';
interface Props {
  slideImageInfo: any;
}

const SlideImageBox: React.FC<Props> = (props: Props) => {
  const { slideImageInfo } = props;
  const slideInfoList: any[] = slideImageInfo;
  const [index, setIndex] = useState<number | undefined>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (cur?: number, prev?: number) => {
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
        onChange={handleChange}
        interval={4000}
        animation="slide"
        indicators={false}
        stopAutoPlayOnHover
        swipe
        className="my-carousel"
      >
        {renderImage()}
      </Carousel>
      {slideInfoList.map((item, i) => (
        <button
          onClick={() => setIndex(i)}
          style={{ background: i === index ? "#ccc" : "#fff" }}
        >
          {i}
        </button>
      ))}
    </div>
  )
};

export default SlideImageBox;