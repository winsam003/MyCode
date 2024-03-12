import Viewer from './components03/Viewer';
import Controller from './components03/Controller';
import Footer from './components/Footer';
import { useState, useEffect, useRef } from 'react';
import Even from './components03/Even';

// ** Counter App
// => 숫자 더하기, 빼기만 있는 초간단 앱

// ** 요구사항 분석
// => UI
//    -> 1 Page 에 Count 버튼이 있는 Controller 와 결과를 출력하는 Viewer 2개 영역 
//       즉, App.js 외에 Controller,  Viewer 2개의 컴포넌트로 구성
//    -> Controller : 6개의 버튼 ( -1, -10, -100, +100, +10, +1 )
//    -> css : 적절하게 중앙에 위치하도록 App.css 수정

// => 기능구현
//    -> State 이용
//    -> Controller 의 버튼을 클릭하면 State값 변경 -> Viewer에 전달되어 출력됨
//    -> State 정의 위치 비교
//       ( Controller,  Viewer 사이는 Props로 전달 불가, 그러므로 부모인 App 에 정의 )

// ** state 정의
// => Controller,  Viewer 모든 컴포넌트에서 필요하므로 부모에 정의
// => State Lifting (끌어올리기) : State 를 여러 컴포넌트에서 사용하도록 하기위해 부모에 정의하는것

// ** 결론 (React 앱의 특징)
// => State : 자식 컴포넌트와 데이터, 이벤트 공유를 통해 관리가능
// => 데이터 (Props) : 부모 -> 자식 (단방향 데이터 흐름)
// => 이벤트 (함수)  : 자식 -> 부모
// => 이러한 점을 고려해서 앱을 설계한다

// ** 이벤트핸들러
// => Data 의 한종류 이므로 자식 컴포넌트에 전달가능

// ================================================================================================================= //

// ** 컴포넌트 LifeCycle
// => 컴포넌트는 개념적으로 props를 input으로 하고
//    UI가 어떻게 보여야 하는지 정의하는 React Element를 output으로 하는 함수.
// => UI를 구성하기 위해서는 화면에 컴포넌트를 
//    그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 함. 
// => 컴포넌트는 이 과정에서 각 프로세스 진행단계 별로 Lifecycle 함수로 불리는 특별한 함수가 실행됨.
//    개발자는 이를 재정의하여 컴포넌트를 제어할 수 있음. (클래스컴포넌트)

// => Mounting : 컴포넌트를 페이지에 처음 랜더링 할때
// => Updating : State, Props 값이 바뀌거나 부모컴포넌트가 리랜더 하면서 자신도 리랜더 될때
// => Unmounting : 컴포넌트가 페이지에서 제거될때 (더이상 랜더링하지않음)

// => 함수 컴포넌트에서는 useEffect 를 이용하여 제어함.

// ** useEffect
// => 어떤 값이 변경될때 마다 특정코드를 실행하는 리액트훅이며
//    이것을 "특정값을 검사한다" 라고 표현함
// => 예를 들면 State 값이 바뀔때 마다 변경된 값을 콘솔에 출력하게 할 수 있음

// => useEffect(callback_함수, [deps]_의존성 배열)
//    두번쨰 인자인 의존성 배열요소의 값이 변경되면 첫번째 인자인 콜백함수를 실행함   
//    의존성 배열의 값이 바뀌게되면 callback 함수가 실행 됨 => 라이프사이클로 쓸 수 있음

// ** Test
// => 1) State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
// => 2) State 변수 text 추가후 확인하기.
// => 3) LifeCycle 제어
// => 4) Mount 제어
// => 5) Update(리랜더링)시에만 호출하도록 변경
// => 6) UnMount 제어
//    6.1) 클린업 이해 (setInterval 활용)
//    6.2) 클린업을 이용한 언마운트 제어하기


function App() {

  // ** Counter : 하위에서 상위로 이벤트리스너를 이용해서 Data 전달(props, event 활용)

  const [count, setCount] = useState(0);

  const onChangeState = (num) => {
    setCount(count+num);
  }
  // ================================================================================================================= //

  // ** LifeCycle Test
  // Test 1) State 변수인 count 값이 바뀌면 바뀐값을 콘솔로 출력한다.
  // => count 값 초기화 할때도 감지함
  // useEffect(() => { console.log(`** useEffect Test01) count=${count}`) }, [count]);

  // Test 2) State 변수 text 추가후 확인하기.
  // => [text] : count 값 변경시에는 출력안됨
  // => [count] : text 값 변경시에는 출력안됨
  // => [count, text] : count 또는 text 변경시 출력됨
  const [text, setText] = useState('useEffect test');
  const onChangeText = (e) => {
    setText(e.target.value);
  }

  // useEffect(() => { console.log(`** useEffect Test02) count=${count}, text=${text}`) }
  //                   , [text, count])



  // 3) LifeCycle 제어1, 두 번째 인자가 없는 경우의 useEffect
  //    => 콜백 함수를 실행 시켜주는 조건 값이 제시되지 않은 경우 => 렌더링 할 때마다 호출 됨
  // useEffect(() => { console.log(`** useEffect Test03) 두 번째 인자가 없음 count=${count}, text=${text}`) })



  // 4) LifeCycle 제어2: 두 번째 인자가 빈 배열 인 경우의 Mount 제어 (Mount는 DOM에 나타나서 첫 화면을 말함)
  //  -> useEffect 에 빈 배열을 전달하면 마운트 시점에만 콜백함수 실행
  //    ( 처음 한번만 실행됨 확인 -> 그러므로 Mount 제어에 이용)
  // useEffect(() => { console.log(`** useEffect Test04) count=${count}, text=${text}`) }, [])



  // 5) LifeCycle 제어3: Update(리랜더링)시에만 호출하도록 변경
  // => 3) 의 경우에서 4)의 경우만 제외 함
  // => 최초 랜더링(mount) 인지 확인할 변수를 정의하고 초기값을 false 로 지정함 -> Ref 객체로 생성 함 (Ref 객체는 DOM 요소 참조 뿐만 아니라 컴포넌트의 변수로도 활용 됨)

  // const didMountRef = useRef(false);
  // useEffect(() => {
  //   if(!didMountRef.current) {
  //     didMountRef.current = true;
  //     // 최초 렌더링 시점 (Mount 시점)
  //   }else{
  //     console.log(`** useEffect Test05) 최초렌더링시 이게 안나와야하지않니? count=${count}, text=${text}`);
  //   }
  // });


// 6) UnMount 제어
  // => 클린업(CleanUp)
  //    특정함수가 실행되고 종료된 후 미처 정리하지못한 사항을 정리하는것
  // => 클린업 필요성 Test : useEffect (setInterval 사용하고 배열 없는) 추가

  // useEffect(() => { setInterval(()=>{ console.log('** 깜빡 **')}, 1000)}); 
  // 랜더링할때 마다 호출 (위3번 ) ,  클린업(CleanUp) 기능이 없는 코드




  // => 두번째 인자 배열이 없으므로 랜더링 할때마다 콜백함수 실행됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 그러나 + , - 클릭으로 리랜더링이 일어나면, 1초 상관없이 출력됨
  // => 콜백함수에서 호출한 setInterval 에 의해 1초마다 콘솔출력됨
  // => 이유 : setInterval 을 계속 호출하므로 복수의 setInterval 이 계속 생성되기때문
  //           호출한 setInterval 을 종료시켜주지 않았기 때문
  //          (setInterval 은 clearInterval 을 호출해서 종료시켜야 멈춤)
  // => 해결 : useEffect 의 클린업 기능

  // => 클린업 함수
  //    - useEffect 의 콜백함수에서 return 하는 함수
  //    - 콜백함수를 재호출하기 전에 실행됨.
  // => 그러므로 이를 이용하여 리랜더링 할때마다 새 setInterval 생성하고 
  //    기존 setInterval 은 삭제하도록 할 수 있다.  

  // 6.1) 클린업 함수로 setInterval 삭제 추가
  
  // useEffect(() => { 
  //   const intervalId = setInterval(()=>{ console.log('** 깜빡 **');}, 1000);
  //   return () => {
  //     console.log('** 클린업 함수 **');
  //     clearInterval(intervalId);
  //   }}); //useEffect

  // 6.2) 클린업을 이용한 언마운트 제어하기
  // => count 값이 짝수면  
  //    "짝수 입니다" 를 출력하는 컴포넌트 (Even.jsx) 를 만든다.
  // => 이를 이용하여 조건부 랜더링 구현 
  //    ( import, <Even /> 랜더링코드 추가 )
  // => Even 에 useEffect 를 추가해서 언마운트 메시지 출력하기


  console.log('** App Update !!! **');
  return (
    <div className="App">
      <h2>* Simple Counter *</h2>
      <section>
        <Viewer count={count}/>
        {/* 
          6.2 ) 클린업을 이용한 언마운트 제어하기 
            => count 값이 짝수인 경우에만 Even 출력
        */}
        {count%2===0 && <Even /> }
        <Controller onChangeState={onChangeState}/>
        {/* && : 앞쪽의 조건식이 참이면 뒤쪽 리턴값 랜더링
                 ( 거짓이면 아무것도 랜더링하지않음 ) */}
        <Footer />
      </section>
      <section>
        <input value={text} onChange={onChangeText}/>
      </section>

    </div >
  );
}

export default App;
