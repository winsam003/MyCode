
import emotion1 from "../images/img/emotion1.png";
import emotion2 from "../images/img/emotion2.png";
import emotion3 from "../images/img/emotion3.png";
import emotion4 from "../images/img/emotion4.png";
import emotion5 from "../images/img/emotion5.png";
import { useSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";

// => id 로 해당하는 image 화일명 return 하는 함수
const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1":
      return emotion1;
    case "2":
      return emotion2;
    case "3":
      return emotion3;
    case "4":
      return emotion4;
    case "5":
      return emotion5;
    default:
      return null;
  } 
};

// => emotion Data List
const emotionList = [
  {
    id: 1,
    name: "완전 좋음",
    img: getEmotionImgById(1),
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImgById(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImgById(4),
  },
  {
    id: 5,
    name: "끔찍함",
    img: getEmotionImgById(5),
  },
];

function SelectEmotion() {

  const [searchParams, setSearchParams]  = useSearchParams();

  const queryId = searchParams.get("id");
  console.log(`** queryId=${queryId}, name=${searchParams.get("name")}`);

  const [ stateId, setStateId ] = useState(queryId);

  //  ** useLocation
  const location = useLocation();
  console.log(`** location = ${location}`);
  console.log(`** location.pathname = ${location.pathname}`);
  console.log(`** location.search = ${location.search}`);

  let selected_item = {
      name: 'Sorry_NotFound',   
      img: getEmotionImgById(5)
  }

  const find_item = emotionList.filter( (emotion)=> parseInt(queryId)===emotion.id );
  selected_item = find_item.length > 0 ?  find_item[0] : selected_item; 

  return (
      <div>
          <h3>** {selected_item.name} **</h3>   
          <img alt="오늘의감정" src={selected_item.img} />
      </div>
  ); // return
}; //Topic

export default function Contact() {

  console.log('** Contact Update !!! **');
  return (
    <div>
      <h3>** Contact, EmotionList **</h3>

      <img alt="감정1" src={require('../images/img/emotion1.png')} width={100} height={100} />
      <img alt="감정2" src={getEmotionImgById(2)} width={100} height={100}/>
      <img alt="감정3" src={getEmotionImgById(3)} width={100} height={100}/>
      <img alt="감정4" src={getEmotionImgById(4)} width={100} height={100}/>
      <img alt="감정5" src={emotion5} width={100} height={100} />
      <p>당신의 기분을 주소창에 쿼리스트링으로 입력해보세요...</p>
      <SelectEmotion />
      
    </div>
  ); //return
} //Contact