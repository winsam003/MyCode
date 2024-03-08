function Body(props){

// ** 부모로부터 전달 된 props 확인
// => props 객체 구조분해 적용
    console.log(props);
    const{name, country} = props;

    return(
        <div className="body">
            <h2>**** 여기는 Body 입니다!!! ****</h2>
            <h3>props.name={name}, props.country={country}</h3>
        </div>
    );  // return
};  // Body

export default Body;