
// ** React.memo
// => 컴포넌트의 불필요한 리랜더링 방지
// => React.memo(메모이제이션 하려는 컴포넌트)
//    인자로 전달된 컴포넌트를 메모이제이션 된 컴포넌트로 return

// ** 최적화 적용
// => 적용전: 부모 컴포넌트인 App 이 리랜더링 되면 무조건 리랜더링 됨
// => 적용후: 마운트시에만 랜더링 됨.

import "./Header.css";
import React from "react";

const Header = () => {
  // => 최적화 적용 전/후 입력/수정/삭제 실행 후 출력 비교
  console.log("** Header Update !! **");
  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
     {/* => 윈도우 이모지 : 윈도우+ .  누르면 표시됨 */}
      <h1>{ new Date().toDateString() }</h1>
      {/* => toDateString() :  날짜를 문자열로 */}
    </div>
  );
};
//export default Header;
// => React.memo 로 감싸기 전 후 비교-
export default React.memo(Header);