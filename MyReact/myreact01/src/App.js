import MyHeader from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// ** import
// => 컴포넌트는 MyComp from real_File_path; 
//    내부 코드에서 MyComp 이름으로 인식

function App() {
// 실습: 객체를 정의하고 컴포넌트로 전달하여 출력하기
// test1) Header 로 전달

  const bestFood = {
    menu: "불맛짬뽕라면",
    price: "5000",
    style: "볶음",
    size: ['small', 'medium', 'large']
  }




// test2) Body 로 전달
  const name = "최주먹밥의 Computer";





  return (
    <div className="App">
      <MyHeader bestFood={bestFood}/>
      <Body name={name} country={'경기도 성남시'}/>
      <Footer />
    </div>
  );
}

export default App;
